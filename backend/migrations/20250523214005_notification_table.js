/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("type").notNullable(); // e.g., 'absence_reported'
    table.string("title").notNullable();
    table.text("message").notNullable();
    table.string("action_url").nullable();
    table.string("related_entity").nullable(); // 'absence', 'student', etc.
    table.integer("related_entity_id").nullable(); // ID of related entity
    table.boolean("read").defaultTo(false);
    table.timestamp("read_at").nullable();
    table.timestamps(true, true);

    // Indexes
    table.index(["user_id"]);
    table.index(["read"]);
    table.index(["created_at"]);
    table.index(["related_entity", "related_entity_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notifications");
};
