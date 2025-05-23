exports.up = function (knex) {
    return knex.schema
      .createTable('parentInscription', (table) => {
        table.increments('id').primary(); 
        table.string('parent_last_name', 255).notNullable();
        table.string('parent_first_name', 255).notNullable();
        table.string('parent_phone_number', 15);
        table.string('parent_card_Id').notNullable;
        table.text('email_address').notNullable;
        table.string('parent_profession', 255);
        table.string('parent_etat_civil', 50).notNullable;
        table.integer('number_kids').notNullable;
        table.boolean('validated').defaultTo(false); 
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('eleveInscription', (table) => {
        table.increments('id').primary(); 
        table.integer('parent_inscription_id').references('id').inTable('parentInscription').onDelete('CASCADE');
        table.string('student_last_name', 255).notNullable();
        table.string('student_first_name', 255).notNullable();
        table.string('student_grade', 50);
        table.string('student_gender', 10);
        table.string('student_nationality', 50);
        table.date('student_birth_date');
        table.string('student_birth_place');
        table.string('student_blood_type', 5);
        table.text('student_allergies');
        table.text('student_chronic_illnesses');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
  };
  

  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('eleveInscription')
      .dropTableIfExists('parentInscription');
  };
  