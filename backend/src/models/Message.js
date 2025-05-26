const pool = require('../db/db');

const saveMessage = async (chatId, senderId, content) => {
  const { rows } = await pool.query(
    `INSERT INTO messages (chat_id, sender_id, content) 
     VALUES ($1, $2, $3) RETURNING *`,
    [chatId, senderId, content]
  );
  return rows[0];
};
// Get paginated messages
  const getMessages= async (chat_id, limit = 50, offset = 0) => {
    const { rows } = await db.query(
      `SELECT m.*, u.username as sender_name
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE chat_id = $1
       ORDER BY timestamp DESC
       LIMIT $2 OFFSET $3`,
      [chat_id, limit, offset]
    );
    return rows;
  };

  // Mark messages as read
  const markAsRead = async (chat_id, user_id) => {
    await db.query(
      `UPDATE messages
       SET is_read = true
       WHERE chat_id = $1
       AND sender_id != $2
       AND is_read = false`,
      [chat_id, user_id]
    );
  };

  // Get unread count for user
  const getUnreadCount = async (user_id) => {
    const { rows } = await db.query(
      `SELECT COUNT(*) as count
       FROM messages m
       JOIN chats c ON m.chat_id = c.id
       WHERE (c.user1_id = $1 OR c.user2_id = $1)
       AND m.sender_id != $1
       AND m.is_read = false`,
      [user_id]
    );
    return parseInt(rows[0].count);
  };

  // Get last message in chat
  const getLastMessage = async (chat_id) => {
    const { rows } = await db.query(
      `SELECT * FROM messages
       WHERE chat_id = $1
       ORDER BY timestamp DESC
       LIMIT 1`,
      [chat_id]
    );
    return rows[0];
  };


module.exports = { saveMessage , markAsRead};