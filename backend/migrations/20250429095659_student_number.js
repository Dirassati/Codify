exports.up = function(knex) {
    return knex.schema.alterTable('groups', (table) => {
      table.integer('student_number').defaultTo(0).alter();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('groups', (table) => {
      table.integer('student_number').defaultTo(null).alter();
    });
  };