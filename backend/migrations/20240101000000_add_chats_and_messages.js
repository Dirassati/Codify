/*
exports.up = function(knex) {
    return knex.schema
      // 2. Create Chats Table
      .createTable('chats', (table) => {
        table.increments('id').primary();
        table.integer('user1_id').unsigned().notNullable()
          .references('id').inTable('users').onDelete('CASCADE');
        table.integer('user2_id').unsigned().notNullable()
          .references('id').inTable('users').onDelete('CASCADE');
        table.boolean('is_approved').defaultTo(false).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        
        // Composite index for user pairs
        table.index(['user1_id', 'user2_id']);
      })
  
      // 3. Create Messages Table
      .createTable('messages', (table) => {
        table.increments('id').primary();
        table.integer('chat_id').unsigned().notNullable()
          .references('id').inTable('chats').onDelete('CASCADE');
        table.integer('sender_id').unsigned().notNullable()
          .references('id').inTable('users').onDelete('CASCADE');
        table.text('content').notNullable();
        table.boolean('is_read').defaultTo(false).notNullable();
        table.timestamp('timestamp').defaultTo(knex.fn.now());
  
        // Indexes for performance
        table.index(['chat_id']);
        table.index(['sender_id']);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('messages')
      .dropTableIfExists('chats')
  };
*/