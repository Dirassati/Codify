const { createChat } = require('../models/Chat');
const User = require('../models/User');

const canChat = async (senderId, receiverId) => {
  const [sender, receiver] = await Promise.all([
    User.findById(senderId),
    User.findById(receiverId)
  ]);
  console.log(sender.user_role);
  console.log(receiver.user_role);
  const allowedPairs = {
    eleve: ['parent', 'enseignant', 'admin'],
    parent: ['eleve', 'enseignant', 'admin'],
    enseignant: ['eleve', 'enseignant', 'admin'],
    admin: ['eleve', 'parent', 'enseignant']
  };
  return allowedPairs[sender.user_role]?.includes(receiver.user_role);
};

const startChat = async (senderId, receiverId) => {
  if (!await canChat(senderId, receiverId)) {
    throw new Error('Communication not allowed between these roles');
  }
  return await createChat(senderId, receiverId);
};

module.exports = { startChat };