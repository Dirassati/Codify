const pool = require("../db/db");

module.exports = {
  async createGroup(name, class_id, grade_id, specialization_id = null) {
    const client = await pool.connect();
    try {
      const existingGroup = await client.query(
        `SELECT * FROM groups 
         WHERE name = $1 
         AND class_id = $2 
         AND grade_id = $3
         AND (specialization_id = $4 OR (specialization_id IS NULL AND $4 IS NULL))`,
        [name, class_id, grade_id, specialization_id]
      );

      if (existingGroup.rows.length > 0) {
        throw new Error("Un groupe avec ces paramètres existe déjà.");
      }

      const result = await client.query(
        `INSERT INTO groups 
         (name, class_id, grade_id, specialization_id, student_number) 
         VALUES ($1, $2, $3, $4, 0) 
         RETURNING *`,
        [name, class_id, grade_id, specialization_id]
      );

      return result.rows[0];
    } finally {
      client.release();
    }
  },

  async distributeStudents() {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const { rows: students } = await client.query(
        "SELECT * FROM eleve WHERE group_id = 0"
      );

      let assignedCount = 0;

      for (const student of students) {
        const { id: studentId, grade_id, specialization_id } = student;

        const {
          rows: [group],
        } = await client.query(
          `SELECT * FROM groups 
           WHERE grade_id = $1 
           AND (specialization_id = $2 OR (specialization_id IS NULL AND $2 IS NULL))
           AND student_number < 20 
           ORDER BY student_number ASC 
           LIMIT 1`,
          [grade_id, specialization_id]
        );

        if (group) {
          await client.query("UPDATE eleve SET group_id = $1 WHERE id = $2", [
            group.id,
            studentId,
          ]);
          await client.query(
            "UPDATE groups SET student_number = student_number + 1 WHERE id = $1",
            [group.id]
          );
          assignedCount++;
        }
      }

      await client.query("COMMIT");
      return { count: assignedCount };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async listGroups() {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(`
        SELECT 
          g.*,
          gr.name as grade_name,
          gr.level as grade_level,
          COALESCE(s.name, 'Général') as specialization_name,
          c.name as classroom_name
        FROM groups g
        JOIN grades gr ON g.grade_id = gr.id
        LEFT JOIN specializations s ON g.specialization_id = s.id
        LEFT JOIN classrooms c ON g.class_id = c.id
      `);
      return rows;
    } finally {
      client.release();
    }
  },

  async getGroupsWithTeachersAndClassrooms() {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(`
        SELECT 
          g.id AS group_id,
          g.name AS group_name,
          c.id AS classroom_id,
          c.name AS classroom_name,
          c.building,
          c.room_number,
          e.id AS teacher_id,
          e.last_name AS teacher_last_name,
          e.first_name AS teacher_first_name,
          s.id AS subject_id,
          s.name AS subject_name
        FROM groups g
        LEFT JOIN classrooms c ON g.class_id = c.id
        LEFT JOIN teacher_group_subjects tgs ON tgs.group_id = g.id
        LEFT JOIN enseignant e ON tgs.teacher_id = e.id
        LEFT JOIN subjects s ON tgs.subject_id = s.id
        ORDER BY g.name, e.last_name, s.name
      `);

      const groupsMap = new Map();

      rows.forEach((row) => {
        if (!groupsMap.has(row.group_id)) {
          groupsMap.set(row.group_id, {
            group_id: row.group_id,
            group_name: row.group_name,
            classroom: row.classroom_id
              ? {
                  classroom_id: row.classroom_id,
                  classroom_name: row.classroom_name,
                  building: row.building,
                  room_number: row.room_number,
                }
              : null,
            teachers: new Map(),
          });
        }

        const group = groupsMap.get(row.group_id);

        if (row.teacher_id) {
          if (!group.teachers.has(row.teacher_id)) {
            group.teachers.set(row.teacher_id, {
              teacher_id: row.teacher_id,
              teacher_name: `${row.teacher_first_name} ${row.teacher_last_name}`,
              subjects: [],
            });
          }

          if (row.subject_id) {
            group.teachers.get(row.teacher_id).subjects.push({
              subject_id: row.subject_id,
              subject_name: row.subject_name,
            });
          }
        }
      });

      return Array.from(groupsMap.values()).map((group) => ({
        ...group,
        teachers: Array.from(group.teachers.values()),
      }));
    } finally {
      client.release();
    }
  },
};
