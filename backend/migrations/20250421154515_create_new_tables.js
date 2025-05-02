exports.up = function(knex) {
    return knex.schema
      .createTable('grades', function(table) {
        table.increments('id');
        table.string('name', 50).notNullable();
      })
  
      //classes
      .createTable('classes', function(table) {
        table.increments('id');
        table.string('name', 50).notNullable();
        table.string('type', 50);
        table.boolean('available').defaultTo(true);
      })
  
      // Subjects
      .createTable('subjects', function(table) {
        table.increments('id');
        table.string('name', 100).notNullable();
        table.text('description');
      })
  
      // Groups
      .createTable('groups', function(table) {
        table.increments('id');
        table.string('name', 10).notNullable();
        table.integer('grade_id').unsigned().references('id').inTable('grades').onDelete('CASCADE');
        table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('SET NULL');
        table.integer('student_number');
      })
  
      // Teacher-Subject-Grade (Pivot Table)
      .createTable('teacher_subject_grade', function(table) {
        table.increments('id');
        table.integer('teacher_id').unsigned().references('id').inTable('enseignant').onDelete('CASCADE');
        table.integer('subject_id').unsigned().references('id').inTable('subjects').onDelete('CASCADE');
        table.integer('grade_id').unsigned().references('id').inTable('grades').onDelete('CASCADE');
        table.unique(['teacher_id', 'subject_id', 'grade_id']);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('teacher_subject_grade')
      .dropTableIfExists('groups')
      .dropTableIfExists('subjects')
      .dropTableIfExists('classes')
      .dropTableIfExists('grades');
  };
  
