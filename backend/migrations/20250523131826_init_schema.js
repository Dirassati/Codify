<<<<<<< HEAD
/*exports.up = async function(knex) {
=======
exports.up = async function(knex) {
>>>>>>> 8275847e6153040f4d1e07659e5ba6efac363622
  await knex.schema.alterTable('grade_subjects_specialization', (table) => {
    table.decimal('coefficient', 3, 1).notNullable().defaultTo(1.0);
  });

  await knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table.integer('eleve_id').unsigned().notNullable()
      .references('id').inTable('eleve').onDelete('CASCADE');
    table.integer('subject_id').unsigned().notNullable()
      .references('id').inTable('subjects').onDelete('CASCADE');
    table.integer('trimestre').notNullable().checkIn([1, 2, 3]);
    
    table.decimal('note_devoir', 4, 2).checkBetween([0, 20]);
    table.decimal('note_examen', 4, 2).checkBetween([0, 20]);
    table.decimal('note_cc', 4, 2).checkBetween([0, 20]);
    
    table.decimal('coefficient', 3, 1).notNullable();
    table.decimal('moyenne_matiere', 4, 2);
    
    table.unique(['eleve_id', 'subject_id', 'trimestre']);
  });

  await knex.schema.createTable('moyennes_generales', (table) => {
    table.integer('eleve_id').unsigned().notNullable()
      .references('id').inTable('eleve').onDelete('CASCADE');
    table.integer('trimestre').notNullable().checkIn([1, 2, 3]);
    table.decimal('moyenne', 4, 2).notNullable();
    table.primary(['eleve_id', 'trimestre']);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('moyennes_generales');
  await knex.schema.dropTableIfExists('notes');
  await knex.schema.alterTable('grade_subjects_specialization', (table) => {
    table.dropColumn('coefficient');
  });
<<<<<<< HEAD
};*/
=======
};
>>>>>>> 8275847e6153040f4d1e07659e5ba6efac363622
