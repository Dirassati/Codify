exports.up = function(knex) {
    return knex.schema.alterTable('equipments', (table) => {
      table.integer('used').unsigned().defaultTo(0).notNullable();
    }).then(() => 
      knex.raw('ALTER TABLE equipments ADD CONSTRAINT check_used_quantity CHECK (used <= quantity)')
    );
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('equipments', (table) => {
      table.dropColumn('used');
    }).then(() => 
      knex.raw('ALTER TABLE equipments DROP CONSTRAINT check_used_quantity')
    );
  };
  