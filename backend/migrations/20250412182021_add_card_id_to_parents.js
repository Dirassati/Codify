exports.up = async function (knex) {
  await knex.schema.alterTable("parents", (table) => {
    table.string("card_id");
  });

  await knex.schema.alterTable("eleveInscription", (table) => {
    table.boolean("validated").defaultTo(false);
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("parents", (table) => {
    table.dropColumn("card_id");
  });
  await knex.schema.alterTable("eleveInscription", (table) => {
    table.dropColumn("validated");
  });
};
