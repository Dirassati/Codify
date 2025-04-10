const pool = require ("../db/db");

const User = {
    findByEmail: async (email) => {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    },
    
    findById: async (id) => {
        const result = await pool.query("SELECT id, password FROM users WHERE id = $1", [id]);
        return result.rows[0];
    },

    updateResetToken: async (email, token, expiresAt) => {
        await pool.query("UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3", [token, expiresAt, email]);
    },

    updatePassword: async (id, hashedPassword) => {
        await pool.query("UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL, WHERE id = $2", [hashedPassword, id]);
    },

      // Add this new method to find by reset token
      /*findByResetToken: async (token) => {
        const result = await pool.query(
            "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()",
            [token]
        );
        return result.rows[0];
    },*/
};


module.exports = User;
