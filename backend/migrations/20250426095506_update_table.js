exports.up = function(knex) {
    return knex.schema.alterTable('equipments', (table) => {
      table.integer('quantity').unsigned().defaultTo(1).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('equipments', (table) => {
      table.dropColumn('quantity');
    });
  };