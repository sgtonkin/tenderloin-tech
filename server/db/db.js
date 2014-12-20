var config = require('../config/config');
var knex = require('knex')({client: 'mysql', connection: config.mysqlConnection});
var bookshelf = require('bookshelf')(knex);
var seed = require('./seed');

if(config.resetDatabaseOnLoad) {

  // Drop any existing db tables to ensure increment values reset
  bookshelf.knex.schema.dropTableIfExists('participants')
  .then(function(){
    return bookshelf.knex.schema.dropTableIfExists('events');
  })
  .then(function(){
    return bookshelf.knex.schema.dropTableIfExists('admins');
  })
  .then(function(){
    return bookshelf.knex.schema.dropTableIfExists('events_participants')
  })

  // Create our tables
  .then(function(){
    return bookshelf.knex.schema.createTable('admins',function(t) {
      t.increments('admin_id').primary();
      t.string('name');
    });
  })
  .then(function(){
    return bookshelf.knex.schema.createTable('participants',function(t) {
      t.increments('participant_id').primary();
      t.string('name');
      t.integer('device_id');
    });
  })
  .then(function(){
    return bookshelf.knex.schema.createTable('events',function(t) {
      t.increments('event_id').primary();
      t.string('name');
      t.dateTime('start_time');
      t.integer('admin_id').notNullable();
    });
  })
  .then(function(){
    return bookshelf.knex.schema.createTable('events_participants',function(t) {
      t.increments('id').primary();
      t.integer('event_id').notNullable();
      t.integer('participant_id').notNullable();
      t.text('status');
    });
  })

  // Once our tables have been created, fill them with data
  .then(seed.seedTables);

}
