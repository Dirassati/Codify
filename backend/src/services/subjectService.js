const db = require("../db/db");

const createSubject = async (name, description, classroom_type = "class") => {
  const query = `
    INSERT INTO subjects (name, description, classroom_type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, description, classroom_type];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const listSubjects = async () => {
  const { rows } = await db.query(`
    SELECT id, name, description, classroom_type 
    FROM subjects
    ORDER BY name ASC
  `);

  return rows.map((row) => ({
    subject: row.name,
    description: row.description,
    classroom_type: row.classroom_type,
  }));
};

const getSubjectById = async (subjectId) => {
  try {
    const { rows } = await db.query("SELECT * FROM subjects WHERE id = $1", [
      subjectId,
    ]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Error fetching parent ${subjectId}:`, error);
    throw error;
  }
};

module.exports = {
  getSubjectById,
  createSubject,
  listSubjects,
};
