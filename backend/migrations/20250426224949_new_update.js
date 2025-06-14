// exports.up = async function(knex) {
//     await knex.schema.alterTable('eleve', (table) => {
//       // Add specialization_id column if not exist
//       table.integer('specialization_id').unsigned().nullable();
//       table.foreign('specialization_id')
//            .references('id')
//            .inTable('specializations')
//            .onDelete('SET NULL');

//       // Add group_id column if not exist
//       table.integer('group_id').unsigned().nullable();
//       table.foreign('group_id')
//            .references('id')
//            .inTable('groups')
//            .onDelete('SET NULL');
//     });
//   };

//   exports.down = async function(knex) {
//     await knex.schema.alterTable('eleve', (table) => {
//       table.dropForeign(['specialization_id']);
//       table.dropForeign(['group_id']);
//       table.dropColumn('specialization_id');
//       table.dropColumn('group_id');
//     });
//   };

exports.up = async function (knex) {
  // Check if columns exist before adding them
  const hasSpecializationId = await knex.schema.hasColumn(
    "eleve",
    "specialization_id"
  );
  const hasGroupId = await knex.schema.hasColumn("eleve", "group_id");

  await knex.schema.alterTable("eleve", (table) => {
    if (!hasSpecializationId) {
      table.integer("specialization_id").unsigned().nullable();
      table
        .foreign("specialization_id")
        .references("id")
        .inTable("specializations")
        .onDelete("SET NULL");
    }

    if (!hasGroupId) {
      table.integer("group_id").unsigned().nullable();
      table
        .foreign("group_id")
        .references("id")
        .inTable("groups")
        .onDelete("SET NULL");
    }
  });
};

exports.down = async function (knex) {
  // Check if foreign keys exist before dropping them
  const hasSpecializationFk = await knex.schema.hasColumn(
    "eleve",
    "specialization_id"
  );
  const hasGroupFk = await knex.schema.hasColumn("eleve", "group_id");

  if (hasSpecializationFk || hasGroupFk) {
    await knex.schema.alterTable("eleve", (table) => {
      if (hasSpecializationFk) {
        table.dropForeign(["specialization_id"]);
        table.dropColumn("specialization_id");
      }
      if (hasGroupFk) {
        table.dropForeign(["group_id"]);
        table.dropColumn("group_id");
      }
    });
  }
};
