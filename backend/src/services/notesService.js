const pool = require('../db/db');
const { logger } = require('../utils/logger');

class NotesService {
  constructor() {
    this.pool = pool;
    setTimeout(() => this.initializeNotesForNewStudents(), 5000);
    setInterval(() => this.initializeNotesForNewStudents(), 3600000);
  }

  async initializeNotesForNewStudents() {
    const client = await this.pool.connect();
    try {
      logger.info('Starting automatic notes initialization...');
      
      const newStudents = await client.query(
        `SELECT e.id as student_id, e.group_id, g.grade_id, g.specialization_id
         FROM eleve e
         JOIN groups g ON e.group_id = g.id
         WHERE e.date_inscription IS NOT NULL
         AND NOT EXISTS (
           SELECT 1 FROM notes WHERE eleve_id = e.id LIMIT 1
         )`
      );

      const studentsMissingSubjects = await client.query(
        `SELECT DISTINCT e.id as student_id, e.group_id, g.grade_id, g.specialization_id
         FROM eleve e
         JOIN groups g ON e.group_id = g.id
         JOIN grade_subjects_specialization gss ON g.grade_id = gss.grade_id 
           AND (g.specialization_id = gss.specialization_id 
           OR (gss.specialization_id IS NULL AND g.specialization_id IS NULL))
         WHERE e.date_inscription IS NOT NULL
         AND NOT EXISTS (
           SELECT 1 FROM notes n 
           WHERE n.eleve_id = e.id 
           AND n.subject_id = gss.subject_id
           LIMIT 1
         )`
      );

      const allStudents = [...newStudents.rows, ...studentsMissingSubjects.rows];
      await this.processStudents(client, allStudents);
      
      logger.info('Automatic notes initialization completed');
    } catch (error) {
      logger.error(`Error in notes initialization: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async processStudents(client, students) {
    for (const student of students) {
      const subjects = await client.query(
        `SELECT subject_id 
         FROM grade_subjects_specialization
         WHERE grade_id = $1 
         AND (specialization_id = $2 OR (specialization_id IS NULL AND $2 IS NULL))`,
        [student.grade_id, student.specialization_id]
      );

      for (const subject of subjects.rows) {
        for (let trimestre = 1; trimestre <= 3; trimestre++) {
          await client.query(
            `INSERT INTO notes (
              eleve_id, subject_id, trimestre, 
              note_cc, note_devoir, note_examen, 
              coefficient, moyenne_matiere
            ) VALUES ($1, $2, $3, 0, 0, 0, $4, 0)
            ON CONFLICT (eleve_id, subject_id, trimestre) DO NOTHING`,
            [student.student_id, subject.subject_id, trimestre, 1.0]
          );
        }
      }
    }
  }

  async getStudentsForGrading(groupId, subjectId, trimestre) {
    try {
      const query = `
        WITH group_info AS (
          SELECT g.grade_id, gr.name as grade_name, gr.level, 
                 g.specialization_id, s.name as specialization_name
          FROM groups g
          JOIN grades gr ON g.grade_id = gr.id
          LEFT JOIN specializations s ON g.specialization_id = s.id
          WHERE g.id = $1
        ),
        subject_info AS (
          SELECT id, name FROM subjects WHERE id = $2
        )
        SELECT 
          e.id, e.matricule, e.last_name, e.first_name,
          n.note_cc, n.note_devoir, n.note_examen, n.moyenne_matiere,
          (SELECT grade_id FROM group_info) as grade_id,
          (SELECT grade_name FROM group_info) as grade_name,
          (SELECT level FROM group_info) as level,
          (SELECT specialization_id FROM group_info) as specialization_id,
          (SELECT specialization_name FROM group_info) as specialization_name,
          (SELECT id FROM subject_info) as subject_id,
          (SELECT name FROM subject_info) as subject_name
        FROM eleve e
        LEFT JOIN notes n ON e.id = n.eleve_id AND n.subject_id = $2 AND n.trimestre = $3
        WHERE e.group_id = $1
        ORDER BY e.last_name, e.first_name`;
      
      const result = await this.pool.query(query, [groupId, subjectId, trimestre]);
      
      if (!result.rows.length) {
        throw new Error('No students found for this group');
      }
      
      return {
        groupInfo: {
          gradeId: result.rows[0].grade_id,
          gradeName: result.rows[0].grade_name,
          level: result.rows[0].level,
          specializationId: result.rows[0].specialization_id,
          specializationName: result.rows[0].specialization_name
        },
        subjectInfo: {
          id: result.rows[0].subject_id,
          name: result.rows[0].subject_name
        },
        students: result.rows.map(row => ({
          id: row.id,
          matricule: row.matricule,
          last_name: row.last_name,
          first_name: row.first_name,
          note_cc: row.note_cc || 0,
          note_devoir: row.note_devoir || 0,
          note_examen: row.note_examen || 0,
          moyenne_matiere: row.moyenne_matiere || 0
        }))
      };
    } catch (error) {
      logger.error(`Error in getStudentsForGrading: ${error}`);
      throw error;
    }
  }

  async saveOrUpdateNote(eleveId, subjectId, trimestre, noteType, value) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      
      const validTypes = ['note_cc', 'note_devoir', 'note_examen'];
      if (!validTypes.includes(noteType)) {
        throw new Error('Invalid note type');
      }
      
      const numericValue = value === '' ? 0 : Math.max(0, Math.min(20, parseFloat(value) || 0));
      
      const level = await this.getStudentLevel(client, eleveId);
      await this.upsertNote(client, eleveId, subjectId, trimestre, noteType, numericValue);
      await this.calculateSubjectAverage(client, eleveId, subjectId, trimestre, level);
      
      await client.query('COMMIT');
      return { success: true, message: 'Note saved successfully' };
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error(`Error in saveOrUpdateNote: ${error}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async getStudentLevel(client, eleveId) {
    const { rows } = await client.query(
      `SELECT gr.level FROM eleve e
       JOIN groups g ON e.group_id = g.id
       JOIN grades gr ON g.grade_id = gr.id
       WHERE e.id = $1`,
      [eleveId]
    );
    return rows[0]?.level;
  }

  async upsertNote(client, eleveId, subjectId, trimestre, noteType, value) {
    const { rowCount } = await client.query(
      'SELECT 1 FROM notes WHERE eleve_id = $1 AND subject_id = $2 AND trimestre = $3',
      [eleveId, subjectId, trimestre]
    );
    
    if (rowCount === 0) {
      await client.query(
        `INSERT INTO notes 
         (eleve_id, subject_id, trimestre, 
          note_cc, note_devoir, note_examen, 
          coefficient, moyenne_matiere)
         VALUES ($1, $2, $3, 
                ${noteType === 'note_cc' ? '$4' : '0'}, 
                ${noteType === 'note_devoir' ? '$4' : '0'}, 
                ${noteType === 'note_examen' ? '$4' : '0'}, 
                1, 0)`,
        [eleveId, subjectId, trimestre, value]
      );
    } else {
      await client.query(
        `UPDATE notes SET ${noteType} = $1 
         WHERE eleve_id = $2 AND subject_id = $3 AND trimestre = $4`,
        [value, eleveId, subjectId, trimestre]
      );
    }
  }

  async calculateSubjectAverage(client, eleveId, subjectId, trimestre, level) {
    const { rows } = await client.query(
      'SELECT note_devoir, note_examen, note_cc FROM notes WHERE eleve_id = $1 AND subject_id = $2 AND trimestre = $3',
      [eleveId, subjectId, trimestre]
    );
    
    if (!rows.length) return;
    
    const row = rows[0];
    const average = this.calculateAverage(row, level);
    
    await client.query(
      'UPDATE notes SET moyenne_matiere = $1 WHERE eleve_id = $2 AND subject_id = $3 AND trimestre = $4',
      [average, eleveId, subjectId, trimestre]
    );
  }

  calculateAverage(notes, level) {
    const devoir = Number(notes.note_devoir) || 0;
    const examen = Number(notes.note_examen) || 0;
    const cc = Number(notes.note_cc) || 0;

    switch (level) {
      case 'primaire':
        return (devoir + examen + cc) / 3;
      case 'moyen':
        return (devoir + (examen * 2) + cc) / 4;
      case 'lycee':
        return (devoir + (examen * 3) + cc) / 5;
      default:
        return 0;
    }
  }

  async getStudentGradesSummary(eleveId, trimestre) {
    const client = await this.pool.connect();
    try {
      const studentInfo = await client.query(
        `SELECT 
          e.id, e.matricule, e.last_name, e.first_name,
          g.id as group_id, g.name as group_name,
          gr.id as grade_id, gr.name as grade_name, gr.level,
          s.id as specialization_id, s.name as specialization_name
         FROM eleve e
         JOIN groups g ON e.group_id = g.id
         JOIN grades gr ON g.grade_id = gr.id
         LEFT JOIN specializations s ON g.specialization_id = s.id
         WHERE e.id = $1`,
        [eleveId]
      );

      if (!studentInfo.rows.length) {
        throw new Error('Student not found');
      }

      const subjectsGrades = await client.query(
        `SELECT 
          sub.id as subject_id, 
          sub.name as subject_name,
          n.note_cc, 
          n.note_devoir, 
          n.note_examen,
          n.moyenne_matiere,
          n.coefficient
         FROM notes n
         JOIN subjects sub ON n.subject_id = sub.id
         WHERE n.eleve_id = $1 AND n.trimestre = $2
         ORDER BY sub.name`,
        [eleveId, trimestre]
      );

      let totalWeightedSum = 0;
      let totalCoefficients = 0;
      
      const subjectsWithGrades = subjectsGrades.rows.map(subject => {
        const note_cc = parseFloat(subject.note_cc) || 0;
        const note_devoir = parseFloat(subject.note_devoir) || 0;
        const note_examen = parseFloat(subject.note_examen) || 0;
        const moyenne_matiere = parseFloat(subject.moyenne_matiere) || 0;
        const coefficient = parseFloat(subject.coefficient) || 1;

        totalWeightedSum += moyenne_matiere * coefficient;
        totalCoefficients += coefficient;

        return {
          subject_id: subject.subject_id,
          subject_name: subject.subject_name,
          note_cc: note_cc,
          note_devoir: note_devoir,
          note_examen: note_examen,
          moyenne_matiere: moyenne_matiere,
          coefficient: coefficient
        };
      });

      const generalAverage = totalCoefficients > 0 ? 
        parseFloat((totalWeightedSum / totalCoefficients).toFixed(2)) : 0;

      return {
        student_info: {
          eleve_id: studentInfo.rows[0].id,
          matricule: studentInfo.rows[0].matricule,
          last_name: studentInfo.rows[0].last_name,
          first_name: studentInfo.rows[0].first_name,
          grade_id: studentInfo.rows[0].grade_id,
          grade_name: studentInfo.rows[0].grade_name,
          level: studentInfo.rows[0].level,
          group_id: studentInfo.rows[0].group_id,
          group_name: studentInfo.rows[0].group_name,
          specialization_id: studentInfo.rows[0].specialization_id,
          specialization_name: studentInfo.rows[0].specialization_name,
          trimestre: trimestre
        },
        subjects: subjectsWithGrades,
        general_average: generalAverage
      };
    } catch (error) {
      logger.error(`Error in getStudentGradesSummary: ${error}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async getAllStudentsWithAverages() {
  const client = await this.pool.connect();
  try {
    const result = {};

    // Process each trimester
    for (let trimestre = 1; trimestre <= 3; trimestre++) {
      result[`trimestre_${trimestre}`] = {};

      // Get all groups with their students
      const groups = await client.query(
        `SELECT DISTINCT g.id as group_id, g.name as group_name
         FROM groups g
         JOIN eleve e ON e.group_id = g.id
         ORDER BY g.id`
      );

      for (const group of groups.rows) {
        result[`trimestre_${trimestre}`][`group_${group.group_id}`] = {
          group_id: group.group_id,
          group_name: group.group_name,
          students: []
        };

        // Get students in this group with their averages
        const students = await client.query(
          `SELECT 
            e.id as eleve_id,
            e.matricule,
            e.last_name,
            e.first_name,
            gr.id as grade_id,
            gr.name as grade_name,
            gr.level,
            s.id as specialization_id,
            s.name as specialization_name,
            (
              SELECT SUM(n.moyenne_matiere * n.coefficient) / SUM(n.coefficient)
              FROM notes n
              WHERE n.eleve_id = e.id AND n.trimestre = $1
            ) as moyenne_generale
           FROM eleve e
           JOIN groups g ON e.group_id = g.id
           JOIN grades gr ON g.grade_id = gr.id
           LEFT JOIN specializations s ON g.specialization_id = s.id
           WHERE g.id = $2
           ORDER BY e.last_name, e.first_name`,
          [trimestre, group.group_id]
        );

        result[`trimestre_${trimestre}`][`group_${group.group_id}`].students = 
          students.rows.map(student => ({
            eleve_id: student.eleve_id,
            matricule: student.matricule,
            last_name: student.last_name,
            first_name: student.first_name,
            grade_id: student.grade_id,
            grade_name: student.grade_name,
            level: student.level,
            specialization_id: student.specialization_id,
            specialization_name: student.specialization_name,
            moyenne_generale: parseFloat(student.moyenne_generale) || 0
          }));
      }
    }

    return result;
  } catch (error) {
    logger.error(`Error in getAllStudentsWithAverages: ${error}`);
    throw error;
  } finally {
    client.release();
  }
}
}

module.exports = new NotesService();