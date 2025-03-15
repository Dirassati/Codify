const pool = require("../db/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenUtils");

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

module.exports = { authenticateUser };