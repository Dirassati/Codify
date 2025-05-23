exports.up = function (knex) {
  return knex.schema.table("eleveInscription", function (table) {
    table
      .string("status")
      .defaultTo("pending")
      .checkIn(["pending", "validated", "refused"]); // pending | validated | refused
    table.string("refusal_reason").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("eleveInscription", function (table) {
    table.dropColumn("status");
    table.dropColumn("refusal_reason");
    table.dropColumn("validated");
  });
};
