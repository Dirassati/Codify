const pool = require('../db/db');

const createChat = async (user1Id, user2Id) => {
  const { rows } = await pool.query(
    `INSERT INTO chats (user1_id, user2_id, , is_approved) 
     VALUES ($1, $2, true) RETURNING *`,
    [user1Id, user2Id]
  );
  return rows[0];
};

// Find chat by participants (order-independent)
  const findByUsers = async(user1_id, user2_id) => {
    const { rows } = await db.query(
      `SELECT * FROM chats 
       WHERE (user1_id = $1 AND user2_id = $2)
       OR (user1_id = $2 AND user2_id = $1)`,
      [user1_id, user2_id]
    );
    return rows[0];
  };

  // Get all chats for a user with last message
  const getAllForUser = async(user_id) => {
    const { rows } = await db.query(
      `SELECT c.*, 
              m.content as last_message_content,
              m.timestamp as last_message_time,
              (SELECT COUNT(*) FROM messages 
               WHERE chat_id = c.id AND is_read = false 
               AND sender_id != $1) as unread_count
       FROM chats c
       LEFT JOIN messages m ON m.id = (
         SELECT id FROM messages 
         WHERE chat_id = c.id 
         ORDER BY timestamp DESC 
         LIMIT 1
       )
       WHERE c.user1_id = $1 OR c.user2_id = $1
       ORDER BY COALESCE(m.timestamp, c.created_at) DESC`,
      [user_id]
    );
    return rows;
  };

  // Get chat details with participants info
   const getWithParticipants = async(chat_id) =>{
    const { rows } = await db.query(
      `SELECT c.*, 
              u1.username as user1_name,
              u2.username as user2_name
       FROM chats c
       JOIN users u1 ON c.user1_id = u1.id
       JOIN users u2 ON c.user2_id = u2.id
       WHERE c.id = $1`,
      [chat_id]
    );
    return rows[0];
  }

module.exports = { createChat };