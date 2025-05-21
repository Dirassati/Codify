const pool = require("../db/db");

exports.createGrade = async (name, level) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO grades (name, level) VALUES ($1, $2) RETURNING *',
      [name, level]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

exports.checkGradeExistence = async (name) => {
  const { rows } = await pool.query(
    'SELECT 1 FROM grades WHERE name = $1',
    [name]
  );
  return rows.length > 0;
};

exports.getAllGrades = async () => {
  const { rows } = await pool.query(
    'SELECT id, name, level FROM grades ORDER BY level'
  );
  return rows;
};

exports.assignSubjectsToGrade = async (grade_id, subject_ids, specialization_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query(
      `DELETE FROM grade_subjects_specialization
       WHERE grade_id = $1 
       AND (specialization_id = $2 OR (specialization_id IS NULL AND $2 IS NULL))`,
      [grade_id, specialization_id]
    );

    for (const subject_id of subject_ids) {
      await client.query(
        `INSERT INTO grade_subjects_specialization
         (grade_id, subject_id, specialization_id)
         VALUES ($1, $2, $3)`,
        [grade_id, subject_id, specialization_id]
      );
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.getGradeById = async (gradeId) => {
  const { rows } = await pool.query(
    'SELECT id, name, level FROM grades WHERE id = $1',
    [gradeId]
  );
  return rows[0] || null;
};

exports.getGradeSubjects = async (gradeId, specializationId = null) => {
  const grade = await this.getGradeById(gradeId);
  if (!grade) {
    throw new Error('Grade not found');
  }

  if (grade.level === 'lycee' && !specializationId) {
    throw new Error('Specialization is required for lycee level grades');
  }

  if (grade.level !== 'lycee' && specializationId) {
    throw new Error('Specialization should not be provided for non-lycee grades');
  }

  const query = `
    SELECT s.id, s.name, s.description
    FROM grade_subjects_specialization gss
    JOIN subjects s ON gss.subject_id = s.id
    WHERE gss.grade_id = $1 
    AND (gss.specialization_id = $2 OR ($2 IS NULL AND gss.specialization_id IS NULL))
  `;

  const { rows } = await pool.query(query, [gradeId, specializationId]);
  
  return {
    grade,
    subjects: rows
  };
};