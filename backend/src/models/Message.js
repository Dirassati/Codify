const pool = require('../db/db');

const saveMessage = async (chatId, senderId, content) => {
  const { rows } = await pool.query(
    `INSERT INTO messages (chat_id, sender_id, content) 
     VALUES ($1, $2, $3) RETURNING *`,
    [chatId, senderId, content]
  );
  return rows[0];
};

module.exports = { saveMessage };