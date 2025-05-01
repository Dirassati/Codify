exports.up = function(knex) {
    return knex.schema.raw(`
      ALTER TABLE users 
      DROP CONSTRAINT IF EXISTS users_email_check, 
      DROP CONSTRAINT IF EXISTS email_or_matricule_check,
      ADD CONSTRAINT email_or_matricule_check 
      CHECK (email IS NOT NULL OR matricule IS NOT NULL)
    `);
  };
  
  exports.down = function(knex) {
    return knex.schema.raw(`
      ALTER TABLE users 
      DROP CONSTRAINT IF EXISTS email_or_matricule_check
    `);
  };
  