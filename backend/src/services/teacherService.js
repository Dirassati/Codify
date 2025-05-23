const pool = require("../db/db");

// List all teachers
exports.listTeachers = async () => {
  const query = `
    SELECT 
      e.id,
      e.last_name,
      e.first_name,
      e.phone_number,
      e.degree,
      e.field,
      e.level,
      e.employment_date,
      u.email
    FROM enseignant e
    JOIN users u ON e.id = u.id
    WHERE u.user_role = 'enseignant'
    ORDER BY e.last_name ASC
  `;
  
  const { rows } = await pool.query(query);
  return rows;
};

// Assign subjects to teacher
exports.assignSubjectsToTeacher = async ({ teacher_id, subject_ids }) => {
  if (!teacher_id) throw new Error("Teacher ID is required");
  if (!subject_ids?.length) throw new Error("At least one subject ID is required");

  const teacherExists = await pool.query(
    'SELECT 1 FROM enseignant WHERE id = $1', 
    [teacher_id]
  );
  if (!teacherExists.rows.length) throw new Error("Teacher not found");

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { rows } = await client.query(`
      INSERT INTO teacher_subjects (teacher_id, subject_id)
      SELECT $1, unnest($2::int[])
      ON CONFLICT (teacher_id, subject_id) DO NOTHING
      RETURNING *;
    `, [teacher_id, subject_ids]);

    await client.query('COMMIT');
    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Get teacher with subjects
exports.getTeacherWithSubjects = async (teacher_id) => {
  const { rows: [teacher] } = await pool.query(
    `SELECT e.*, u.email 
     FROM enseignant e
     JOIN users u ON e.id = u.id
     WHERE e.id = $1`, 
    [teacher_id]
  );

  if (!teacher) throw new Error("Teacher not found");

  const { rows: subjects } = await pool.query(
    `SELECT s.id, s.name, s.description
     FROM teacher_subjects ts
     JOIN subjects s ON ts.subject_id = s.id
     WHERE ts.teacher_id = $1`,
    [teacher_id]
  );

  return { ...teacher, subjects };
};

// Assign teacher to group subject
exports.assignTeacherToGroupSubject = async (teacher_id, group_id, subject_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const existing = await client.query(
      `SELECT teacher_id FROM teacher_group_subjects
       WHERE group_id = $1 AND subject_id = $2`,
      [group_id, subject_id]
    );

    if (existing.rows.length > 0) {
      throw new Error(`Subject ${subject_id} already has teacher ${existing.rows[0].teacher_id}`);
    }

    const qualified = await client.query(
      `SELECT 1 FROM teacher_subjects
       WHERE teacher_id = $1 AND subject_id = $2`,
      [teacher_id, subject_id]
    );
    if (qualified.rows.length === 0) {
      throw new Error('Teacher not qualified for this subject');
    }

    const validSubject = await client.query(
      `SELECT 1 FROM grade_subjects_specialization gss
       JOIN groups g ON g.grade_id = gss.grade_id
         AND (g.specialization_id = gss.specialization_id OR 
              (g.specialization_id IS NULL AND gss.specialization_id IS NULL))
       WHERE g.id = $1 AND gss.subject_id = $2`,
      [group_id, subject_id]
    );
    if (validSubject.rows.length === 0) {
      throw new Error('Subject not in group curriculum');
    }

    await client.query(
      `INSERT INTO teacher_group_subjects
       (teacher_id, group_id, subject_id, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())`,
      [teacher_id, group_id, subject_id]
    );

    await client.query('COMMIT');
    return { 
      success: true,
      message: 'Teacher assigned successfully'
    };
  } catch (error) {
    await client.query('ROLLBACK');
    return {
      success: false,
      error: error.message
    };
  } finally {
    client.release();
  }
};

exports.getGroupSubjectsWithTeachers = async (group_id) => {
  const { rows } = await pool.query(
    `SELECT 
       s.id AS subject_id,
       s.name AS subject_name,
       tgs.teacher_id,
       e.last_name AS teacher_last_name,
       e.first_name AS teacher_first_name,
       e.id AS teacher_id
     FROM grade_subjects_specialization gss
     JOIN subjects s ON gss.subject_id = s.id
     LEFT JOIN teacher_group_subjects tgs ON tgs.group_id = $1 AND tgs.subject_id = s.id
     LEFT JOIN enseignant e ON tgs.teacher_id = e.id
     WHERE gss.grade_id = (SELECT grade_id FROM groups WHERE id = $1)
     AND (gss.specialization_id = (SELECT specialization_id FROM groups WHERE id = $1) 
          OR gss.specialization_id IS NULL)`,
    [group_id]
  );
  return rows;
};

exports.getTeacherGroupsWithDetails = async (teacherId) => {
  const query = `
    SELECT 
      g.id AS group_id,
      g.name AS group_name,
      s.name AS subject_name,
      gr.name AS grade_name,
      gr.level AS grade_level,
      COALESCE(sp.name, '-') AS specialization_name,
      COALESCE(c.name, '-') AS classroom_name
    FROM teacher_group_subjects tgs
    JOIN groups g ON tgs.group_id = g.id
    JOIN subjects s ON tgs.subject_id = s.id
    JOIN grades gr ON g.grade_id = gr.id
    LEFT JOIN specializations sp ON g.specialization_id = sp.id
    LEFT JOIN classrooms c ON g.class_id = c.id
    WHERE tgs.teacher_id = $1
    ORDER BY g.name, s.name
  `;

  const { rows } = await pool.query(query, [teacherId]);
  return rows;
};

exports.getTeacherForSubjectInGroup = async (groupId, subjectId) => {
  const query = `
    SELECT 
      e.id AS teacher_id,
      e.last_name,
      e.first_name,
      e.phone_number,
      u.email,  -- Now getting email from users table
      e.degree,
      e.field,
      e.level,
      e.employment_date
    FROM enseignant e
    JOIN users u ON e.id = u.id  -- Join with users table
    JOIN teacher_group_subjects tgs ON e.id = tgs.teacher_id
    WHERE tgs.group_id = $1 AND tgs.subject_id = $2
      AND u.user_role = 'enseignant'  -- Ensure it's a teacher
    LIMIT 1
  `;
  
  const { rows } = await pool.query(query, [groupId, subjectId]);
  
  if (rows.length === 0) {
    throw new Error("No teacher found for this subject in the specified group");
  }
  
  return rows[0];
};