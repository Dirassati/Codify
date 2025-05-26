const pool = require('../db/db');

class BaseSearchService {
  constructor(tableName, nameColumns) {
    if (!tableName || !nameColumns?.length) {
      throw new Error('tableName and nameColumns are required');
    }
    this.tableName = tableName;
    this.nameColumns = nameColumns;
  }

  async search({ searchTerm, searchBy, dateType, dateRange }) {
    console.log("[INPUTS]", { searchTerm, searchBy, dateType, dateRange });
    /*if (!searchBy) {
      throw new Error('searchBy parameter is required (must be "matricule" or "name")');
    }
        // Normalize searchBy to lowercase
        searchBy = searchBy?.toLowerCase();

        // Validate searchBy value
        const VALID_SEARCH_TYPES = ['matricule', 'name'];
        if (!VALID_SEARCH_TYPES.includes(searchBy)) {
          throw new Error(`Invalid searchBy: ${searchBy}. Must be one of: ${VALID_SEARCH_TYPES.join(', ')}`);
        }
    // Validate searchTerm based on search type
    if (searchBy === 'matricule') {
      if (!searchTerm?.trim()) {
        throw new Error('searchTerm is required for matricule search');
      }
      searchTerm = searchTerm.trim();
    } else if (searchBy === 'name' && !searchTerm?.trim()) {
      throw new Error('searchTerm is required for name search');
    }
    // Validate date parameters if provided
    if (dateRange) {
      if (!Array.isArray(dateRange)) {
        throw new Error('dateRange must be an array [startDate, endDate]');
      }
      if (dateRange.length !== 2) {
        throw new Error('dateRange must contain exactly 2 elements [startDate, endDate]');
      }
      if (!dateType || !['created', 'updated'].includes(dateType)) {
        throw new Error('dateType is required with dateRange and must be "created" or "updated"');
      }
    }*/
    
    // 1. Get table structure dynamically
  const { rows: columns } = await pool.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = $1
  `, [this.tableName])

  const tableColumns = columns
    .map(col => col.column_name)
    .filter(col => !['id', 'matricule'].includes(col)) // Exclude conflicting columns
    .map(col => `t.${col}`);

    let query = `
      SELECT 
        u.id, u.email, u.matricule, u.created_at, u.updated_at,
        ${tableColumns.join(',')}  -- Dynamic columns from joined table
      FROM users u
      INNER JOIN ${this.tableName} t ON u.id = t.id
    `;

    const params = [];
    const conditions = [];

    // Name search
    if (searchTerm && searchBy === 'name') {
      const nameConditions = this.nameColumns.map(col => 
        `t.${col} ILIKE $${params.length + 1}`
      );
      conditions.push(`(${nameConditions.join(' OR ')})`);
      params.push(`%${searchTerm}%`);
    }

    // Matricule search
    if (searchTerm && searchBy === 'matricule') {
      conditions.push(`u.matricule = $${params.length + 1}`);
      params.push(searchTerm);
    }

    // Date range
    if (dateRange && dateType) {
      if (!['created', 'updated'].includes(dateType)) {
        throw new Error('dateType must be "created" or "updated"');
      }
    
      // 2. Validate dateRange array
      if (!Array.isArray(dateRange) || dateRange.length !== 2) {
        throw new Error('dateRange must be an array of [startDate, endDate]');
      }
    
      // 3. Parse dates
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format. Use YYYY-MM-DD');
      }
      const column = dateType === 'created' ? 'u.created_at' : 'u.updated_at';
      conditions.push(`${column} BETWEEN $${params.length + 1} AND $${params.length + 2}`);
      params.push(startDate, endDate);
    }
    console.log("Conditions Array:", conditions);
    console.log("Conditions Length:", conditions.length);
    if (conditions.length) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY t.${this.nameColumns[0]} ASC LIMIT 50`;
    
    console.log("======== DEBUG ========");
    console.log("Final Query:", query);
    console.log("Parameters:", params);
    console.log("======================");

    const { rows } = await pool.query(query, params);
    console.log("Returned Rows:", rows); //  Check what's actually returned
    return rows;
  }
    
    
    //Debugger

    
  
    
    
}

module.exports = BaseSearchService;