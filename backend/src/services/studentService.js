const pool = require("../db/db");

exports.listStudents = async () => {
  const query = `
    SELECT 
      e.id,
      e.last_name,
      e.first_name,
      u.matricule,
      u.email,
      g.name as group_name,
      gr.name as grade_year,
      gr.level as grade_level,
      COALESCE(s.name, '-') as specialization_name
    FROM eleve e
    JOIN users u ON e.id = u.id
    LEFT JOIN groups g ON e.group_id = g.id
    LEFT JOIN grades gr ON e.grade_id = gr.id
    LEFT JOIN specializations s ON e.specialization_id = s.id
    ORDER BY e.last_name ASC
  `;
  
  const { rows } = await pool.query(query);
  return rows;
};

exports.listStudentsByGroup = async (groupId) => {
  const query = `
    SELECT 
      e.id,
      e.last_name,
      e.first_name,
      u.matricule,
      u.email,
      gr.name as grade_year,
      gr.level as grade_level,
      COALESCE(s.name, '-') as specialization_name
    FROM eleve e
    JOIN users u ON e.id = u.id
    LEFT JOIN grades gr ON e.grade_id = gr.id
    LEFT JOIN specializations s ON e.specialization_id = s.id
    WHERE e.group_id = $1
    ORDER BY e.last_name ASC 
  `;
  
  const { rows } = await pool.query(query, [groupId]);
  return rows;
};

const SPECIALIZATIONS_BY_GRADE = {
  '1-lycee': [1, 4],
  '2-lycee': [5, 6, 7, 9, 10, 11],
  '3-lycee': [5, 6, 7, 9, 10, 11]
};

exports.assignSpecialization = async (studentId, specializationId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const studentRes = await client.query(
      `SELECT e.id, g.name as grade_name, g.level 
       FROM eleve e
       JOIN grades g ON e.grade_id = g.id
       WHERE e.id = $1`,
      [studentId]
    );

    if (studentRes.rows.length === 0) throw new Error("Étudiant non trouvé");

    const { grade_name, level } = studentRes.rows[0];
    const gradeKey = `${grade_name}-${level.toLowerCase()}`;

    if (!SPECIALIZATIONS_BY_GRADE[gradeKey]?.includes(Number(specializationId))) {
      throw new Error(`Spécialisation non autorisée pour ce niveau (${gradeKey})`);
    }

    await client.query(
      `UPDATE eleve SET specialization_id = $1 WHERE id = $2`,
      [specializationId, studentId]
    );

    const specRes = await client.query(
      'SELECT name FROM specializations WHERE id = $1',
      [specializationId]
    );

    await client.query('COMMIT');

    return {
      studentId,
      specialization: {
        id: specializationId,
        name: specRes.rows[0]?.name || 'Inconnue'
      },
      grade: { name: grade_name, level }
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.getAvailableSpecializations = async (studentId) => {
  const res = await pool.query(
    `SELECT g.name as grade_name, g.level 
     FROM eleve e
     JOIN grades g ON e.grade_id = g.id
     WHERE e.id = $1`,
    [studentId]
  );

  if (res.rows.length === 0) throw new Error("Étudiant non trouvé");

  const { grade_name, level } = res.rows[0];
  const gradeKey = `${grade_name}-${level.toLowerCase()}`;
  const allowedIds = SPECIALIZATIONS_BY_GRADE[gradeKey] || [];

  const { rows } = await pool.query(
    `SELECT id, name FROM specializations 
     WHERE id = ANY($1::int[])
     ORDER BY name ASC`,
    [allowedIds]
  );

  return {
    grade: { name: grade_name, level },
    specializations: rows
  };
};

exports.getStudentDetails = async (studentId) => {
  const query = `
    WITH student_base AS (
      SELECT 
        e.id,
        e.last_name,
        e.first_name,
        e.group_id,
        e.specialization_id,
        g.grade_id,
        g.class_id,
        g.name AS group_name
      FROM eleve e
      LEFT JOIN groups g ON e.group_id = g.id
      WHERE e.id = $1
    )
    SELECT 
      sb.id AS student_id,
      sb.last_name,
      sb.first_name,
      sb.group_name,
      gr.name AS grade_name,
      gr.level AS grade_level,
      en.last_name AS teacher_last_name,
      en.first_name AS teacher_first_name,
      sub.name AS subject_name,
      c.name AS classroom_name,
      COALESCE(sp.name, '-') AS specialization_name
    FROM 
      student_base sb
    LEFT JOIN 
      grades gr ON sb.grade_id = gr.id
    LEFT JOIN 
      teacher_group_subjects tgs ON sb.group_id = tgs.group_id
    LEFT JOIN 
      enseignant en ON tgs.teacher_id = en.id
    LEFT JOIN 
      subjects sub ON tgs.subject_id = sub.id
    LEFT JOIN 
      classrooms c ON sb.class_id = c.id
    LEFT JOIN
      specializations sp ON sb.specialization_id = sp.id
    WHERE 
      sb.id = $1
    ORDER BY
      sub.name ASC, en.last_name ASC
  `;
  
  const { rows } = await pool.query(query, [studentId]);
  
  if (rows.length === 0) {
    throw new Error("Étudiant non trouvé");
  }
  
  const result = {
    student_id: rows[0].student_id,
    last_name: rows[0].last_name,
    first_name: rows[0].first_name,
    group_name: rows[0].group_name || '-',
    grade: rows[0].grade_name ? {
      name: rows[0].grade_name,
      level: rows[0].grade_level
    } : { name: '-', level: '-' },
    classroom: rows[0].classroom_name || '-',
    specialization: rows[0].specialization_name || '-',
    teachers_subjects: []
  };
  
  const seenCombinations = new Set();
  
  rows.forEach(row => {
    if (row.teacher_last_name && row.subject_name) {
      const key = `${row.teacher_last_name}-${row.teacher_first_name}-${row.subject_name}`;
      if (!seenCombinations.has(key)) {
        seenCombinations.add(key);
        result.teachers_subjects.push({
          teacher: {
            last_name: row.teacher_last_name || '-',
            first_name: row.teacher_first_name || '-'
          },
          subject: row.subject_name || '-'
        });
      }
    }
  });
  
  return result;
};

exports.listStudentSubjects = async (studentId) => {
  const query = `
    SELECT 
      s.id,
      s.name,
      s.description,
      gss.weekly_hours,
      gss.is_double_session,
      gss.coefficient
    FROM eleve e
    JOIN grade_subjects_specialization gss ON 
      e.grade_id = gss.grade_id AND 
      (e.specialization_id = gss.specialization_id OR gss.specialization_id IS NULL)
    JOIN subjects s ON gss.subject_id = s.id
    WHERE e.id = $1
    ORDER BY s.name ASC
  `;

  const { rows } = await pool.query(query, [studentId]);
  
  if (rows.length === 0) {
    throw new Error("Étudiant non trouvé ou aucune matière associée");
  }
  
  return rows;
};