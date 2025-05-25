const { startChat } = require('../services/ChatService');

const createChat = async (req, res) => {
  try {
    const chat = await startChat(req.user.id, req.body.receiverId);
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createChat };      