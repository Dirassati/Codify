const pool = require("../db/db");

module.exports = {
  async createGrade(name, level) {
    const { rows } = await pool.query(
      'INSERT INTO grades (name, level) VALUES ($1, $2) RETURNING *',
      [name, level]
    );
    return rows[0];
  },

  async getAllGrades() {
    const { rows } = await pool.query(
      'SELECT id, name, level FROM grades ORDER BY level, name'
    );
    return rows;
  },

  async getGradeById(gradeId) {
    const { rows } = await pool.query(
      'SELECT id, name, level FROM grades WHERE id = $1',
      [gradeId]
    );
    return rows[0];
  },

 async assignSubjectsToGrade(gradeId, subjects, specializationId = null) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Clear existing assignments
      await client.query(
        `DELETE FROM grade_subjects_specialization
         WHERE grade_id = $1 
         AND (specialization_id = $2 OR (specialization_id IS NULL AND $2 IS NULL))`,
        [gradeId, specializationId]
      );

      // Insert new assignments
      for (const subject of subjects) {
        await client.query(
          `INSERT INTO grade_subjects_specialization
           (grade_id, subject_id, specialization_id, weekly_hours, is_double_session, coefficient)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            gradeId, 
            subject.subjectId, 
            specializationId, 
            subject.weeklyHours, 
            subject.isDoubleSession,
            subject.coefficient || 1.0 // Default to 1.0 if not provided
          ]
        );
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
  async getGradeSubjects(gradeId, specializationId = null) {
    const grade = await this.getGradeById(gradeId);
    if (!grade) throw new Error('Grade not found');

    // Validate specialization requirements
    if (grade.level === 'lycee' && !specializationId) {
      throw new Error('Specialization is required for lycee level grades');
    }
    if (grade.level !== 'lycee' && specializationId) {
      throw new Error('Specialization should not be provided for non-lycee grades');
    }

    const { rows } = await pool.query(
      `SELECT 
         s.id, s.name, s.description, 
         gss.weekly_hours as "weeklyHours", 
         gss.is_double_session as "isDoubleSession"
       FROM grade_subjects_specialization gss
       JOIN subjects s ON gss.subject_id = s.id
       WHERE gss.grade_id = $1 
       AND (gss.specialization_id = $2 OR ($2 IS NULL AND gss.specialization_id IS NULL))
       ORDER BY s.name`,
      [gradeId, specializationId]
    );

    return {
      grade,
      subjects: rows
    };
  }
};