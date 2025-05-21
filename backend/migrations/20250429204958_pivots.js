exports.up = function(knex) {
    return knex.schema
      // Create grade_subjects table
      .createTable('grade_subjects', function(table) {
        table.integer('grade_id').unsigned().notNullable();
        table.integer('subject_id').unsigned().notNullable();

        table.primary(['grade_id', 'subject_id']);
        
        table.foreign('grade_id')
             .references('id')
             .inTable('grades')
             .onDelete('CASCADE');
        
        table.foreign('subject_id')
             .references('id')
             .inTable('subjects')
             .onDelete('CASCADE');
        
        table.timestamps(true, true);
      })
      
      // Create teacher_group_subjects table
      .createTable('teacher_group_subjects', function(table) {
        table.integer('teacher_id').unsigned().notNullable();
        table.integer('group_id').unsigned().notNullable();
        table.integer('subject_id').unsigned().notNullable();
        
        table.primary(['teacher_id', 'group_id', 'subject_id']);
        
        table.foreign('teacher_id')
             .references('id')
             .inTable('enseignant')
             .onDelete('CASCADE');
        
        table.foreign('group_id')
             .references('id')
             .inTable('groups')
             .onDelete('CASCADE');
        
        table.foreign('subject_id')
             .references('id')
             .inTable('subjects')
             .onDelete('CASCADE');
        
        table.foreign(['group_id', 'subject_id'])
             .references(['grade_id', 'subject_id'])
             .inTable('grade_subjects');
        
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('teacher_group_subjects')
      .dropTable('grade_subjects');
  };
