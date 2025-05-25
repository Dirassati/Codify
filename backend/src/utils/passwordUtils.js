// const bcrypt = require('bcryptjs');

// const hashPassword = async (password) => {
//   return await bcrypt.hash(password, 10);
// };

// module.exports = { hashPassword };

const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const saltRounds = 10; // Make sure this is defined
  if (!password) throw new Error("Password is required");
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
