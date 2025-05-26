/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("absences", function (table) {
    table.increments("id").primary();

    // Student information
    table.integer("student_id").unsigned().notNullable();
    table.foreign("student_id").references("id").inTable("eleve");

    // Group information
    table.integer("group_id").unsigned().notNullable();
    table.foreign("group_id").references("id").inTable("groups");

    // Teacher who reported the absence
    table.integer("teacher_id").unsigned().notNullable();
    table.foreign("teacher_id").references("id").inTable("enseignant");

    // Timetable session reference (optional but useful for tracking)
    table.integer("subject_id").unsigned().nullable();
    table.foreign("subject_id").references("id").inTable("subjects");

    // Absence details
    table.date("date").notNullable();
    table.time("timing").notNullable();
    table.boolean("justified").defaultTo(false);
    table.text("justification_text").nullable();
    table.string("justification_file_path").nullable(); // Store file path if uploaded

    // Admin validation
    table.boolean("validated").defaultTo(false);
    table.integer("validated_by").unsigned().nullable();
    table.foreign("validated_by").references("id").inTable("users");
    table.timestamp("validated_at").nullable();

    // Parent who provided justification (if any)
    table.integer("parent_id").unsigned().nullable();
    table.foreign("parent_id").references("id").inTable("parents");

    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    // Indexes for better performance
    table.index(["student_id", "date"]);
    table.index(["teacher_id"]);
    table.index(["validated"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("absences");
};
