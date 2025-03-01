const pool = require('../db/db');

const checkAccountStatus = async (req, res, next) => {
  const { id } = req.params; // Assuming the user ID is in the request params

  try {
    // Fetch the user's status from the database
    const result = await pool.query('SELECT status FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { status } = result.rows[0];

    // Check if the account is active
    if (status === 'inactive') {
      return res.status(403).json({ message: 'Account is deactivated. Please contact support.' });
    }

    // If the account is active, proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Error checking account status:', err);
    res.status(500).json({ message: 'Error checking account status' });
  }
};

module.exports = checkAccountStatus;