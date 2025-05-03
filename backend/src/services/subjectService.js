const db = require("../db/db");

const createSubject = async (name, description) => {
  const query = `
    INSERT INTO subjects (name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [name, description];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const listSubjects = async () => {
  const { rows } = await db.query(`
    SELECT id, name, description 
    FROM subjects
    ORDER BY name ASC
  `);
  
  return rows.map(row => ({
    subject: row.name,  
    description: row.description
  }));
};

module.exports = {
  createSubject, listSubjects
};
