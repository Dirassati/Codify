const pool = require("../db/db");

exports.createSpecialization = async (name, description) => {
  const client = await pool.connect();
  try {
    const existing = await client.query(
      "SELECT * FROM specializations WHERE name = $1",
      [name]
    );

    if (existing.rows.length > 0) {
      throw new Error("Specialization already exists");
    }

    const result = await client.query(
      "INSERT INTO specializations (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
};

exports.getSpecializationById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, name, description FROM specializations WHERE id = $1',
    [id]
  );
  return rows[0] || null;
};