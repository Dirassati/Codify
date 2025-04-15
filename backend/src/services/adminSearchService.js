/*
const pool = require('../config/db');

class AdminSearchService {
  async searchUsers({ searchTerm, searchBy, dateType, dateRange }) {
    let query = `
      SELECT 
        u.id, u.email, u.matricule, u.created_at, u.updated_at,
        COALESCE(p.first_name, e.first_name, t.first_name, a.first_name) as first_name,
        COALESCE(p.last_name, e.last_name, t.last_name, a.last_name) as last_name,
        CASE
          WHEN p.id IS NOT NULL THEN 'parent'
          WHEN e.id IS NOT NULL THEN 'student'
          WHEN t.id IS NOT NULL THEN 'teacher'
          WHEN a.id IS NOT NULL THEN 'admin'
        END as role
      FROM users u
      LEFT JOIN parents p ON u.id = p.id
      LEFT JOIN eleve e ON u.id = e.id
      LEFT JOIN enseignant t ON u.id = t.id
      LEFT JOIN admin a ON u.id = a.id
    `;

    const params = [];
    let conditions = [];

    if (searchTerm && searchBy === 'name') {
      conditions.push(`
        (p.first_name ILIKE $${params.length + 1} OR 
         p.last_name ILIKE $${params.length + 1} OR
         e.first_name ILIKE $${params.length + 1} OR 
         e.last_name ILIKE $${params.length + 1} OR
         t.first_name ILIKE $${params.length + 1} OR 
         t.last_name ILIKE $${params.length + 1})
      `);
      params.push(`%${searchTerm}%`);
    }

    if (searchTerm && searchBy === 'matricule') {
      conditions.push(`u.matricule = $${params.length + 1}`);
      params.push(searchTerm);
    }

    if (dateRange && dateType) {
      const column = dateType === 'created' ? 'u.created_at' : 'u.updated_at';
      conditions.push(`${column} BETWEEN $${params.length + 1} AND $${params.length + 2}`);
      params.push(new Date(dateRange[0]), new Date(dateRange[1]));
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY last_name ASC LIMIT 50`;
    
    const { rows } = await pool.query(query, params);
    return rows;
  }
}

module.exports = new AdminSearchService();*/