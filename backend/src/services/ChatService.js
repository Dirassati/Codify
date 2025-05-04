const { createChat } = require('../models/Chat');
const User = require('../models/User');

const canChat = async (senderId, receiverId) => {
  const [sender, receiver] = await Promise.all([
    User.findById(senderId),
    User.findById(receiverId)
  ]);
  const allowedPairs = {
    student: ['parent', 'teacher', 'admin'],
    parent: ['student', 'teacher', 'admin'],
    teacher: ['student', 'parent', 'admin'],
    admin: ['student', 'parent', 'teacher']
  };
  return allowedPairs[sender.role]?.includes(receiver.role);
};

const startChat = async (senderId, receiverId) => {
  if (!await canChat(senderId, receiverId)) {
    throw new Error('Communication not allowed between these roles');
  }
  return await createChat(senderId, receiverId);
};

module.exports = { startChat };