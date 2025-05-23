exports.up = function(knex) {
    return knex.schema
      .alterTable('grade_subjects_specialization', (table) => {
        table.integer('weekly_hours').notNullable().defaultTo(1);
        table.boolean('is_double_session').defaultTo(false);
      })
      .createTable('timetable', (table) => {
        table.increments('id').primary();
        table.integer('group_id').unsigned().notNullable().references('id').inTable('groups');
        table.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects');
        table.integer('teacher_id').unsigned().notNullable().references('id').inTable('enseignant');
        table.integer('classroom_id').unsigned().notNullable().references('id').inTable('classrooms');
        table.enum('day', ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi']).notNullable();
        table.string('timeslot', 20).notNullable();
        table.integer('duration').notNullable();
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('timetable')
      .alterTable('grade_subjects_specialization', (table) => {
        table.dropColumn('weekly_hours');
        table.dropColumn('is_double_session');
      });
  };