const pool = require('../db/db');

const checkAccountStatus = async (req, res, next) => {
  const { id } = req.params; 

  try {
    const result = await pool.query('SELECT status FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { status } = result.rows[0];

    if (status === 'inactive') {
      return res.status(403).json({ message: 'Account is deactivated. Please contact support.' });
    }

    next();
  } catch (err) {
    console.error('Error checking account status:', err);
    res.status(500).json({ message: 'Error checking account status' });
  }
};

module.exports = checkAccountStatus;