exports.up = async function(knex) {
    await knex.schema
      // Création de la table teacher_subjects
      .createTable('teacher_subjects', (table) => {
        table.integer('teacher_id').unsigned().notNullable();
        table.integer('subject_id').unsigned().notNullable();
        table.primary(['teacher_id', 'subject_id']);
        table.foreign('teacher_id').references('id').inTable('enseignant').onDelete('CASCADE');
        table.foreign('subject_id').references('id').inTable('subjects').onDelete('CASCADE');
        table.timestamps(true, true);
      });
  }; 
  
  exports.down = async function(knex) {
    await knex.schema
      .dropTable('teacher_subjects');
  }; 