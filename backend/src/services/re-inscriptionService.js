const pool = require("../db/db");
const knex = require("../db/knex");

const make_Account_reinscription_status = async (userId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start the transaction

    // Update the user's status to 're-inscription'
    const result = await client.query(
      "UPDATE users SET status = $1 WHERE id = $2 RETURNING *",
      ["re-inscription", userId]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    await client.query("COMMIT"); // Commit the transaction
    return result.rows[0]; // Return the updated user
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback the transaction if something goes wrong
    throw err;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

const getAllParentsSorted = async () => {
  return await knex("parents");
};

const getAllStudentsSorted = async () => {
  return await knex("eleve");
};

const getStudentsByParentIdSorted = async (parentId) => {
  return await knex("eleve").where({ parent_id: parentId });
};

const getStudentById = async (studentId) => {
  return await knex("eleve").where({ id: studentId });
};

const getParentById = async (parentId) => {
  return await knex("parents").where({ id: parentId });
};

const updateStudentStatus = async (studentId, updates) => {
  return await knex("eleve").where({ id: studentId }).update(updates);
};

const updateParentStatus = async (parentId, updates) => {
  return await knex("parents").where({ id: parentId }).update(updates);
};

const getParentByEmail = async (email) => {
  return await knex("users").where({ email });
};

const getStudentByFields = async (matricule, nom, prenom) => {
  return await knex("eleve").where({
    matricule,
    last_name: nom,
    first_name: prenom,
  });
};

const findUserById = async (id) => {
  return await knex("users").where({ id });
};

module.exports = {
  make_Account_reinscription_status,
  getAllParentsSorted,
  getAllStudentsSorted,
  getParentById,
  getStudentById,
  getStudentsByParentIdSorted,
  updateParentStatus,
  updateStudentStatus,
  getParentByEmail,
  getStudentByFields,
  findUserById
};
