const pool = require('../db/db');

const checkMatriculeExists = async (matricule) => {
  const { rows } = await pool.query(
    'SELECT 1 FROM users WHERE matricule = $1 LIMIT 1',
    [matricule]
  );
  return rows.length > 0;
};

module.exports = { checkMatriculeExists };