const pool = require('./src/db/db.js');
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connection successful! Current time:', res.rows[0].now);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    pool.end();
  }
};
testConnection();