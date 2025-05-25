/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("users", function (table) {
    table.string("status", 20).alter();
  });
  await knex.raw(`
      ALTER TABLE users
      DROP CONSTRAINT IF EXISTS users_status_check,
      ADD CONSTRAINT users_status_check CHECK (status IN ('active', 'inactive', 're-inscription'));
    `);
};

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = async function (knex) {
//   await knex.schema.alterTable("users", function (table) {
//     table.string("status", 10).alter();
//   });
//   await knex.raw(`
//       ALTER TABLE users
//       DROP CONSTRAINT IF EXISTS users_status_check,
//       ADD CONSTRAINT users_status_check CHECK (status IN ('active', 'inactive'));
//     `);
// };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Make sure no values violate the new length
  await knex("users").whereRaw("char_length(status) > 10").del(); // or .update({ status: 'inactive' }) to keep them

  // Remove or update violating values BEFORE changing constraint
  await knex.raw(`
      ALTER TABLE users 
      DROP CONSTRAINT IF EXISTS users_status_check;
  `);

  // Change column length safely
  await knex.schema.alterTable("users", function (table) {
    table.string("status", 10).alter();
  });

  // Re-add the stricter constraint
  await knex.raw(`
      ALTER TABLE users 
      ADD CONSTRAINT users_status_check CHECK (status IN ('active', 'inactive'));
  `);
};
