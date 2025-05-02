exports.up = function(knex) {
    return Promise.all([
      knex.schema.alterTable('grades', function(table) {
        table.enu('level', ['primaire', 'moyen', 'lycee']).notNullable().defaultTo('primaire');
      }),
      knex.schema.alterTable('eleve', function(table) {
        table.integer('group_id').unsigned().defaultTo(0);
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.alterTable('grades', function(table) {
        table.dropColumn('level');
      }),
      knex.schema.alterTable('eleve', function(table) {
        table.dropColumn('group_id');
      })
    ]);
  };
  