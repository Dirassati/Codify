// migrations/20250523111244_add_grading_system.js

exports.up = function(knex) {
  return knex.schema
    .alterTable('grade_subjects_specialization', (table) => {
      table.decimal('coefficient', 3, 1).notNullable().defaultTo(1.0);
    })
    .then(() => {
      return knex.schema.createTable('notes', (table) => {
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
    })
    .then(() => {
      return knex.schema.createTable('moyennes_generales', (table) => {
        table.integer('eleve_id').unsigned().notNullable()
          .references('id').inTable('eleve').onDelete('CASCADE');
        table.integer('trimestre').notNullable().checkIn([1, 2, 3]);
        table.decimal('moyenne', 4, 2).notNullable();
        table.primary(['eleve_id', 'trimestre']);
      });
    })
    .then(() => {
      return knex.raw(`
        CREATE OR REPLACE FUNCTION init_student_grades()
        RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO notes (eleve_id, subject_id, trimestre, coefficient)
          SELECT 
            NEW.id,
            gss.subject_id,
            t.trimestre,
            gss.coefficient
          FROM 
            grade_subjects_specialization gss,
            generate_series(1, 3) AS t(trimestre)
          WHERE 
            gss.grade_id = NEW.grade_id AND 
            (gss.specialization_id = NEW.specialization_id OR gss.specialization_id IS NULL);
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);
    })
    .then(() => {
      return knex.raw(`
        CREATE TRIGGER tr_init_student_grades
        AFTER INSERT ON eleve
        FOR EACH ROW
        EXECUTE FUNCTION init_student_grades();
      `);
    });
};

exports.down = function(knex) {
  return knex.raw('DROP TRIGGER IF EXISTS tr_init_student_grades ON eleve')
    .then(() => knex.raw('DROP FUNCTION IF EXISTS init_student_grades'))
    .then(() => knex.schema.dropTable('moyennes_generales'))
    .then(() => knex.schema.dropTable('notes'))
    .then(() => knex.schema.alterTable('grade_subjects_specialization', (table) => {
      table.dropColumn('coefficient');
    }));
};