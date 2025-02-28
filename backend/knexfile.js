// knexfile.js
require('dotenv').config(); // Load environment variables from .env

module.exports = {
  development: {
    client: 'pg', // Use PostgreSQL
    connection: {
      host: process.env.DB_HOST, // Database host (e.g., 'localhost')
      user: process.env.DB_USER, // Database user (e.g., 'postgres')
      password: process.env.DB_PASSWORD, // Database password
      database: process.env.DB_NAME, // Database name (e.g., 'codify_db')
      port: process.env.DB_PORT, // Database port (e.g., 5432)
    },
    migrations: {
      directory: './migrations', // Folder to store migration files
      tableName: 'knex_migrations', // Table to track migrations
    },
    seeds: {
      directory: './seeds', // Folder to store seed files (optional)
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
  },
};