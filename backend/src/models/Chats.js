const pool = require('../db/db');

const createChat = async (user1Id, user2Id) => {
  const { rows } = await pool.query(
    `INSERT INTO chats (user1_id, user2_id) 
     VALUES ($1, $2) RETURNING *`,
    [user1Id, user2Id]
  );
  return rows[0];
};

module.exports = { createChat };