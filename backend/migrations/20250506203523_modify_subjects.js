// migrations/20240101000004_add_classroom_type_to_subjects.js
exports.up = function(knex) {
    return knex.schema.alterTable('subjects', (table) => {
      table.string('classroom_type', 20)
        .defaultTo('class')
        .comment("Type of classroom needed: 'class', 'lab', 'informatique', 'sport', 'art'");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('subjects', (table) => {
      table.dropColumn('classroom_type');
    });
  };