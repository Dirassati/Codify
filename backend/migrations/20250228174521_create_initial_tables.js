exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email", 255).unique();
      table.string("matricule", 255).unique();
      table.string("password", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());

      // Modified constraints to be compatible with PostgreSQL
      table
        .enu("status", ["active", "inactive"], {
          useNative: true,
          enumName: "user_status",
        })
        .defaultTo("active");

      // Alternative check constraint syntax
      table.check("?? IS NOT NULL OR ?? IS NOT NULL", ["email", "matricule"]);
    })
    .createTable("parents", (table) => {
      table
        .integer("id")
        .primary()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("last_name", 255).notNullable();
      table.string("first_name", 255).notNullable();
      table.string("phone_number", 15);
      table.text("address");
      table.string("profession", 255);
      table.string("etat_civil", 50);
    })
    .createTable("enseignant", (table) => {
      table
        .integer("id")
        .primary()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("last_name", 255).notNullable();
      table.string("first_name", 255).notNullable();
      table.string("phone_number", 15);
      table.text("address");
      table.string("gender", 10);
      table.string("degree", 255);
      table.string("field", 255);
      table.string("level", 50);
      table.date("employment_date");
    })
    .createTable("eleve", (table) => {
      table
        .integer("id")
        .primary()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("last_name", 255).notNullable();
      table.string("first_name", 255).notNullable();
      table.text("address");
      table.string("grade", 50);
      table.string("gender", 10);
      table.string("nationality", 50);
      table.date("birth_date");
      table.string("blood_type", 5);
      table.text("allergies");
      table.text("chronic_illnesses");
      table.date("date_inscription");
      table
        .integer("parent_id")
        .references("id")
        .inTable("parents")
        .onDelete("CASCADE");
    })
    .createTable("admin", (table) => {
      table
        .integer("id")
        .primary()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("last_name", 255).notNullable();
      table.string("first_name", 255).notNullable();
      table.string("phone_number", 15);
      table.text("address");
      table.string("role", 50);
      table.date("employment_date");
    });
};

exports.down = function (knex) {
  return (
    knex.schema
      .dropTableIfExists("admin")
      .dropTableIfExists("eleve")
      .dropTableIfExists("enseignant")
      .dropTableIfExists("parents")
      .dropTableIfExists("users")
      // For PostgreSQL, drop the enum type if it exists
      .raw("DROP TYPE IF EXISTS user_status")
  );
};
