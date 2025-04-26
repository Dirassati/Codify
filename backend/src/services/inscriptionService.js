const pool = require("../db/db");

const createParentInscription = async (parentData) => {
  const {
    parent_last_name,
    parent_first_name,
    parent_phone_number,
    parent_card_Id,
    email_address,
    parent_profession,
    parent_etat_civil,
    number_kids,
  } = parentData;

  let client;

  try {
    if (pool.ending || pool.ended) {
      throw new Error("Connection pool is in ending/ended state");
    }
    client = await pool.connect().catch((err) => {
      console.error("Failed to get client from pool:", err);
      throw new Error("Database connection failed");
    });

    await client.query("BEGIN");

    const parentInscriptionQuery = `
        INSERT INTO "parentInscription" (
          parent_last_name, parent_first_name, parent_phone_number, "parent_card_Id",
          email_address, parent_profession, parent_etat_civil, number_kids
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id`;

    const parentInscriptionValues = [
      parent_last_name,
      parent_first_name,
      parent_phone_number,
      parent_card_Id,
      email_address,
      parent_profession,
      parent_etat_civil,
      number_kids,
    ];

    const parentInscriptionResult = await client.query(
      parentInscriptionQuery,
      parentInscriptionValues
    );
    const parentInscriptionId = parentInscriptionResult.rows[0].id;

    await client.query("COMMIT");
    return parentInscriptionId;
  } catch (err) {
    console.error("Error occurred:", err);
    if (client) {
      await client.query("ROLLBACK");
    }
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }
};

// Step 2: Add Student to Parent Inscription
const addStudentToInscription = async (parentInscriptionId, studentData) => {
  const {
    student_last_name,
    student_first_name,
    student_grade,
    student_gender,
    student_nationality,
    student_birth_date,
    student_blood_type,
    student_allergies,
    student_chronic_illnesses,
  } = studentData;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Step 2: Add student information to the eleveInscription table
    const studentQuery = `
      INSERT INTO "eleveInscription" (
        parent_inscription_id, student_last_name, student_first_name, student_grade, 
        student_gender, student_nationality, student_birth_date, student_blood_type, 
        student_allergies, student_chronic_illnesses
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id`;

    const studentValues = [
      parentInscriptionId,
      student_last_name,
      student_first_name,
      student_grade,
      student_gender,
      student_nationality,
      student_birth_date,
      student_blood_type,
      student_allergies,
      student_chronic_illnesses,
    ];

    const studentResult = await client.query(studentQuery, studentValues);
    const studentId = studentResult.rows[0].id;

    await client.query("COMMIT");
    return studentId;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error adding student to inscription:", err);
    throw err;
  } finally {
    client.release();
  }
};

const knex = require("../db/knex");

const getParentInscriptionById = async (parentId) => {
  return await knex("parentInscription").where({ id: parentId }).first();
};

const getStudentsByParentId = async (parentId) => {
  return await knex("eleveInscription").where({
    parent_inscription_id: parentId,
  });
};

const findUserByEmail = async (email) => {
  return await knex("users").where({ email, status: "active" }).first();
};

const getAllParentsSorted = async () => {
  return await knex("parentInscription");
};

const getAllStudentsSorted = async () => {
  return await knex("eleveInscription");
};

const getStudentsByParentIdSorted = async (parentId) => {
  return await knex("eleveInscription").where({
    parent_inscription_id: parentId,
  });
};

const getStudentById = async (studentId) => {
  return await knex("eleveInscription").where({ id: studentId });
};

const getParentById = async (parentId) => {
  return await knex("parentInscription").where({ id: parentId });
};

const getFiltredInscriptions = async (status) => {
  return await knex("eleveInscription").where({ status: status });
};

const updateStudentStatus = async (studentId, updates) => {
  return await knex("eleveInscription")
    .where({ id: studentId })
    .update(updates);
};

const updateParentStatus = async (parentId, updates) => {
  return await knex("parentInscription")
    .where({ id: parentId })
    .update(updates);
};

module.exports = {
  createParentInscription,
  addStudentToInscription,
  getParentInscriptionById,
  getStudentsByParentId,
  findUserByEmail,
  getAllParentsSorted,
  getAllStudentsSorted,
  getStudentsByParentIdSorted,
  getStudentById,
  getParentById,
  getFiltredInscriptions,
  updateStudentStatus,
  updateParentStatus,
};
