/*
exports.up = async function(knex) {
  // Enable only essential extension
  await knex.raw('CREATE EXTENSION IF NOT EXISTS pg_trgm');

  // Users table
  await knex.raw('CREATE INDEX idx_users_matricule ON users(matricule)');
  await knex.raw('CREATE INDEX idx_users_created ON users(created_at)');

  // Parents table
  await knex.raw(`
    CREATE INDEX idx_parents_name 
    ON parents USING gin(first_name gin_trgm_ops, last_name gin_trgm_ops)
  `);
  await knex.raw('CREATE INDEX idx_parents_profession ON parents(profession)');

  // Students table
  await knex.raw(`
    CREATE INDEX idx_students_name 
    ON eleve USING gin(first_name gin_trgm_ops, last_name gin_trgm_ops)
  `);
  await knex.raw('CREATE INDEX idx_students_grade ON eleve(grade)');
  await knex.raw('CREATE INDEX idx_students_parent ON eleve(parent_id)');

  // Teachers table
  await knex.raw(`
    CREATE INDEX idx_teachers_name 
    ON enseignant USING gin(first_name gin_trgm_ops, last_name gin_trgm_ops)
  `);
  await knex.raw('CREATE INDEX idx_teachers_field ON enseignant(field)');
};

exports.down = async function(knex) {
  // Students
  await knex.raw('DROP INDEX IF EXISTS idx_students_parent');
  await knex.raw('DROP INDEX IF EXISTS idx_students_grade');
  await knex.raw('DROP INDEX IF EXISTS idx_students_name');
  
  // Parents
  await knex.raw('DROP INDEX IF EXISTS idx_parents_profession');
  await knex.raw('DROP INDEX IF EXISTS idx_parents_name');
  
  // Teachers
  await knex.raw('DROP INDEX IF EXISTS idx_teachers_field');
  await knex.raw('DROP INDEX IF EXISTS idx_teachers_name');
  
  // Users
  await knex.raw('DROP INDEX IF EXISTS idx_users_created');
  await knex.raw('DROP INDEX IF EXISTS idx_users_matricule');
  
  // Extension
  await knex.raw('DROP EXTENSION IF EXISTS pg_trgm');
};
  */