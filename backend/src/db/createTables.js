const pool = require('./db');

const createTables = async () => {
  try {
    // Create Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
        ID SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        matricule VARCHAR(255) UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(10) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        CHECK (email IS NOT NULL OR matricule IS NOT NULL)
      );
    `);

    // Create Parents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Parents (
        ID INT PRIMARY KEY REFERENCES Users(ID) ON DELETE CASCADE,
        last_name VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(15),
        address TEXT,
        profession VARCHAR(255),
        etat_civil VARCHAR(50)
      );
    `);

    // Create Enseignant table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Enseignant (
        ID INT PRIMARY KEY REFERENCES Users(ID) ON DELETE CASCADE,
        last_name VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(15),
        address TEXT,
        gender VARCHAR(10),
        degree VARCHAR(255),
        field VARCHAR(255),
        level VARCHAR(50),
        employment_date DATE
      );
    `);

    // Create Elève table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Eleve (
        ID INT PRIMARY KEY REFERENCES Users(ID) ON DELETE CASCADE,
        last_name VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        address TEXT,
        grade VARCHAR(50),
        gender VARCHAR(10),
        nationality VARCHAR(50),
        birth_date DATE,
        blood_type VARCHAR(5),
        allergies TEXT,
        chronic_illnesses TEXT,
        date_inscription DATE,
        parent_id INT REFERENCES Parents(ID) ON DELETE CASCADE
      );
    `);

    // Create Admin table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Admin (
        ID INT PRIMARY KEY REFERENCES Users(ID) ON DELETE CASCADE,
        last_name VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(15),
        address TEXT,
        role VARCHAR(50),
        employment_date DATE
      );
    `);

    console.log('Tables created successfully!');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    pool.end(); 
  }
};

// Run the function to create tables
createTables();