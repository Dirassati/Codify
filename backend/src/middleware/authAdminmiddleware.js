const pool = require('../db/db');

module.exports = async (req, res, next) => {
  console.log('Request user:', req.user);
  const userId = req.user?.id; // Assuming you have auth middleware before this
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { rows } = await pool.query(
    'SELECT 1 FROM admin WHERE id = $1 LIMIT 1',
    [userId]
  );
  
  if (rows.length === 0) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};