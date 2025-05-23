exports.up = async function(knex) {
  //using transaction knew control
  return knex.transaction(async trx => {
    // Check if columns exist first
    const hasSpecialization = await trx.schema.hasColumn('eleve', 'specialization_id');
    const hasGroup = await trx.schema.hasColumn('eleve', 'group_id');

    if (!hasSpecialization) {
    await knex.schema.alterTable('eleve', (table) => {
      // Add specialization_id column if not exist
      table.integer('specialization_id').unsigned().nullable();
      table.foreign('specialization_id')
           .references('id')
           .inTable('specializations')
           .onDelete('SET NULL');
    });
  }

  if (!hasGroup) {
    await trx.schema.alterTable('eleve', table => {
      // Add group_id column if not exist
      table.integer('group_id').unsigned().nullable();
      table.foreign('group_id')
           .references('id')
           .inTable('groups')
           .onDelete('SET NULL');
    });
  }
});
  };
  
  exports.down = async function(knex) {
    return knex.transaction(async trx => {
      // Safely remove columns if they exist
      await trx.schema.alterTable('eleve', table => {
        table.dropColumn('specialization_id');
        table.dropColumn('group_id');
      });
    });
  };
  