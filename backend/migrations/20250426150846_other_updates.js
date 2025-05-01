exports.up = function(knex) {
    return knex.schema
      // Création de la table 'specializations'
      .createTable('specializations', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').nullable(); 
      })
      
      // Modification de la table 'groups' 
      .then(() => {
        return knex.schema.alterTable('groups', (table) => {
          table.integer('specialization_id').nullable();
          table.foreign('specialization_id').references('id').inTable('specializations').onDelete('SET NULL');
        });
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      // Suppression de la colonne 'specialization_id' de la table 'groups'
      .alterTable('groups', (table) => {
        table.dropForeign('specialization_id');
        table.dropColumn('specialization_id');
      })
      // Suppression de la table 'specializations'
      .then(() => {
        return knex.schema.dropTableIfExists('specializations');
      });
  };
  