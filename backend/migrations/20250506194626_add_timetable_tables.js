// exports.up = function(knex) {
//     return knex.schema
//       .alterTable('grade_subjects_specialization', (table) => {
//         table.integer('weekly_hours').notNullable().defaultTo(1);
//         table.boolean('is_double_session').defaultTo(false);
//       })
//       .createTable('timetable', (table) => {
//         table.increments('id').primary();
//         table.integer('group_id').unsigned().notNullable().references('id').inTable('groups');
//         table.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects');
//         table.integer('teacher_id').unsigned().notNullable().references('id').inTable('enseignant');
//         table.integer('classroom_id').unsigned().notNullable().references('id').inTable('classrooms');
//         table.enum('day', ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi']).notNullable();
//         table.string('timeslot', 20).notNullable();
//         table.integer('duration').notNullable();
//         table.timestamps(true, true);
//       });
//   };

//   exports.down = function(knex) {
//     return knex.schema
//       .dropTableIfExists('timetable')
//       .alterTable('grade_subjects_specialization', (table) => {
//         table.dropColumn('weekly_hours');
//         table.dropColumn('is_double_session');
//       });
//   };

exports.up = async function (knex) {
  // First check if the table exists
  const hasGradeSubjectsTable = await knex.schema.hasTable(
    "grade_subjects_specialization"
  );

  // Create timetable table first since it's independent
  await knex.schema.createTable("timetable", (table) => {
    table.increments("id").primary();
    table
      .integer("group_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("groups");
    table
      .integer("subject_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("subjects");
    table
      .integer("teacher_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("enseignant");
    table
      .integer("classroom_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("classrooms");
    table
      .enum("day", ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"])
      .notNullable();
    table.string("timeslot", 20).notNullable();
    table.integer("duration").notNullable();
    table.timestamps(true, true);
  });

  // Only alter grade_subjects_specialization if it exists
  if (hasGradeSubjectsTable) {
    await knex.schema.alterTable("grade_subjects_specialization", (table) => {
      table.integer("weekly_hours").notNullable().defaultTo(1);
      table.boolean("is_double_session").defaultTo(false);
    });
  }
};

exports.down = async function (knex) {
  // Drop timetable table
  await knex.schema.dropTableIfExists("timetable");

  // Check if grade_subjects_specialization exists before altering
  const hasGradeSubjectsTable = await knex.schema.hasTable(
    "grade_subjects_specialization"
  );

  if (hasGradeSubjectsTable) {
    const hasWeeklyHours = await knex.schema.hasColumn(
      "grade_subjects_specialization",
      "weekly_hours"
    );
    const hasDoubleSession = await knex.schema.hasColumn(
      "grade_subjects_specialization",
      "is_double_session"
    );

    if (hasWeeklyHours || hasDoubleSession) {
      await knex.schema.alterTable("grade_subjects_specialization", (table) => {
        if (hasWeeklyHours) table.dropColumn("weekly_hours");
        if (hasDoubleSession) table.dropColumn("is_double_session");
      });
    }
  }
};
