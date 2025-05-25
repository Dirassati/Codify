exports.up = async function (knex) {
  await knex.schema.alterTable("eleve", (table) => {
    table.string("matricule", 255).unique();
  });

  await knex.schema.alterTable("users", (table) => {
    table.string("user_role", 255);
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("eleve", (table) => {
    table.dropColumn("matricule");
  });

  const hasValidatedColumn = await knex.schema.hasColumn("users", "role");
  if (hasValidatedColumn) {
    await knex.schema.alterTable("users", (table) => {
      table.dropColumn("role");
    });
  }
};
