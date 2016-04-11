
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function ( table ){
    table.increments();
    table.string('username');
    table.string('avatar');
    table.boolean('admin');
  })
  .createTable('posts', function ( table ){
    table.increments();
    table.string('title');
    table.string('description');
    table.integer('rating');
    table.integer('user_id');
    table.integer('location');
    table.string('imgLink');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
  .createTable('comments', function ( table ){
    table.increments();
    table.integer('user_id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.string('comment');
    table.integer('post_id')
  })
};

exports.down = function(knex, Promise) {

};
