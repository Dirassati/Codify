const pool = require("../db/db");
const { hashPassword } = require("../utils/passwordUtils");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenUtils");

const createAccount = async (
  email,
  matricule,
  password,
  user_role,
  roleData
) => {
  const hashedPassword = await hashPassword(password);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Insert into users table
    const userQuery = `
      INSERT INTO users (email, matricule, password, user_role)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const userValues = [
      email || null,
      matricule || null,
      hashedPassword,
      user_role,
    ];
    const userResult = await client.query(userQuery, userValues);
    const user = userResult.rows[0];

    // Insert into role-specific table
    switch (user_role) {
      case "parents":
        await client.query(
          `INSERT INTO parents (id, last_name, first_name, phone_number, address, profession, etat_civil)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            user.id,
            roleData.last_name,
            roleData.first_name,
            roleData.phone_number,
            roleData.address,
            roleData.profession,
            roleData.etat_civil,
          ]
        );
        break;

      case "eleve":
        const parentCheckQuery = `SELECT id FROM parents WHERE id = $1`;
        const parentCheckResult = await client.query(parentCheckQuery, [
          roleData.parent_id,
        ]);

        if (parentCheckResult.rows.length === 0) {
          throw new Error("Parent ID does not exist");
        }
        await client.query(
          `INSERT INTO eleve (id, matricule, last_name, first_name, address, grade, gender, nationality, birth_date, blood_type, allergies, chronic_illnesses, date_inscription, parent_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            user.id,
            matricule,
            roleData.last_name,
            roleData.first_name,
            roleData.address,
            roleData.grade,
            roleData.gender,
            roleData.nationality,
            roleData.birth_date,
            roleData.blood_type,
            roleData.allergies,
            roleData.chronic_illnesses,
            roleData.date_inscription,
            roleData.parent_id,
          ]
        );
        break;

      case "enseignant":
        await client.query(
          `INSERT INTO enseignant (id, last_name, first_name, phone_number, address, gender, degree, field, level, employment_date)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            user.id,
            roleData.last_name,
            roleData.first_name,
            roleData.phone_number,
            roleData.address,
            roleData.gender,
            roleData.degree,
            roleData.field,
            roleData.level,
            roleData.employment_date,
          ]
        );
        break;

      case "admin":
        await client.query(
          `INSERT INTO admin (id, last_name, first_name, phone_number, address, role, employment_date)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            user.id,
            roleData.last_name,
            roleData.first_name,
            roleData.phone_number,
            roleData.address,
            roleData.role,
            roleData.employment_date,
          ]
        );
        break;

      default:
        throw new Error("Invalid role");
    }

    await client.query("COMMIT");
    return user;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const modifyAccount = async (userId, email, password, roleData) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Fetch the current user data
    const userResult = await client.query(
      "SELECT email, user_role FROM users WHERE id = $1",
      [userId]
    );
    const currentUser = userResult.rows[0];

    if (!currentUser) {
      throw new Error("User not found");
    }

    const role = currentUser.user_role; // Fetch the role from the database

    // Check for email conflict (if email is provided and different from current email)
    if (email && email !== currentUser.email) {
      const emailCheck = await client.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );
      if (emailCheck.rows.length > 0) {
        throw new Error("Email already exists");
      }
    }

    // Update the users table (only if email or password is provided)
    let userQuery = "UPDATE users SET ";
    const userValues = [];
    let index = 1;

    if (email) {
      userQuery += `email = $${index}, `;
      userValues.push(email);
      index++;
    }

    if (password) {
      const hashedPassword = await hashPassword(password);
      userQuery += `password = $${index}, `;
      userValues.push(hashedPassword);
      index++;
    }

    userQuery = userQuery.slice(0, -2);

    userQuery += ` WHERE id = $${index} RETURNING *`;
    userValues.push(userId);

    const updatedUserResult = await client.query(userQuery, userValues);
    const updatedUser = updatedUserResult.rows[0];

    // Update the role-specific table (only if roleData is provided)
    if (roleData) {
      let roleQuery = `UPDATE ${role} SET `;
      const roleValues = [];
      index = 1;

      for (const [key, value] of Object.entries(roleData)) {
        roleQuery += `${key} = $${index}, `;
        roleValues.push(value);
        index++;
      }

      roleQuery = roleQuery.slice(0, -2);

      roleQuery += ` WHERE id = $${index}`;
      roleValues.push(userId);

      await client.query(roleQuery, roleValues);
    }

    await client.query("COMMIT"); // Commit the transaction
    return updatedUser;
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback the transaction if something goes wrong
    throw err;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

const deactivate_Account = async (userId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start the transaction

    // Update the user's status to 'inactive'
    const result = await client.query(
      "UPDATE users SET status = $1 WHERE id = $2 RETURNING *",
      ["inactive", userId]
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

const activate_Account = async (userId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start the transaction

    // Update the user's status to 'active'
    const result = await client.query(
      "UPDATE users SET status = $1 WHERE id = $2 RETURNING *",
      ["active", userId]
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

const authenticateUser = async (email, password) => {
  const client = await pool.connect();

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await client.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = userResult.rows[0];

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT Token
    const token = generateToken(user);

    return { token, user };
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  createAccount,
  modifyAccount,
  deactivate_Account,
  activate_Account,
  authenticateUser,
};
