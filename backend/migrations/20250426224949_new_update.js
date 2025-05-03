exports.up = async function(knex) {
    await knex.schema.alterTable('eleve', (table) => {
      // Add specialization_id column if not exist
      table.integer('specialization_id').unsigned().nullable();
      table.foreign('specialization_id')
           .references('id')
           .inTable('specializations')
           .onDelete('SET NULL');
  
      // Add group_id column if not exist
      table.integer('group_id').unsigned().nullable();
      table.foreign('group_id')
           .references('id')
           .inTable('groups')
           .onDelete('SET NULL');
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.alterTable('eleve', (table) => {
      table.dropForeign(['specialization_id']);
      table.dropForeign(['group_id']);
      table.dropColumn('specialization_id');
      table.dropColumn('group_id');
    });
  };
  