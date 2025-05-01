exports.up = async function(knex) {
    //  Renommer la table 'classes' 
    const hasClassesTable = await knex.schema.hasTable('classes');
    if (hasClassesTable) {
      await knex.schema.renameTable('classes', 'classrooms');
    }
  
    // Modifier la table classrooms 
    await knex.schema.alterTable('classrooms', (table) => {
      table.integer('capacity').notNullable().defaultTo(20); 
      table.string('building').notNullable().defaultTo('Main'); 
      table.integer('floor'); 
      table.string('room_number').notNullable(); 
      table.text('description'); 
      table.timestamps(true, true); 
      table.unique(['building', 'floor', 'room_number']);
    });
  
    // Créer la table equipments
    await knex.schema.createTable('equipments', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.text('description');
      table.timestamps(true, true);
    });
  
    // la table pivot classroom_equipments
    await knex.schema.createTable('classroom_equipments', (table) => {
      table.increments('id').primary();
      table.integer('classroom_id').unsigned().references('id').inTable('classrooms').onDelete('CASCADE');
      table.integer('equipment_id').unsigned().references('id').inTable('equipments').onDelete('CASCADE');
      table.integer('quantity').unsigned().defaultTo(1);
      table.unique(['classroom_id', 'equipment_id']);
    });
  };
  
  exports.down = async function(knex) {
    // Supprimer les tables dans l'ordre inverse
    await knex.schema.dropTableIfExists('classroom_equipments');
    await knex.schema.dropTableIfExists('equipments');
    
    // Revenir à la structure originale de 'classes' si nécessaire
    const hasClassroomsTable = await knex.schema.hasTable('classrooms');
    if (hasClassroomsTable) {
      await knex.schema.alterTable('classrooms', (table) => {
        table.dropColumn('capacity');
        table.dropColumn('building');
        table.dropColumn('floor');
        table.dropColumn('room_number');
        table.dropColumn('description');
        table.dropTimestamps();
      });
      await knex.schema.renameTable('classrooms', 'classes');
    }
  };
