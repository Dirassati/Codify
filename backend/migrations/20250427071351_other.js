exports.up = async function(knex) {
    await knex.schema.alterTable('eleve', (table) => {
        
        table.integer('grade_id').unsigned().nullable();
        table.foreign('grade_id')
             .references('id')
             .inTable('grades')
             .onDelete('SET NULL');
    
      });
    };
    
    exports.down = async function(knex) {
      await knex.schema.alterTable('eleve', (table) => {
        table.dropForeign(['grade_id']);
        table.dropColumn('grade_id');
      });
    };
    
exports.down = function(knex) {
  
};
