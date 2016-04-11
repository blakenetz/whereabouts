
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function ( table ){
    table.increments();
    table.string('email').unique();
    table.string('username').unique();
    table.string('password');
    table.string('avatar');
    table.boolean('admin').defaultTo(false);
  })
  .createTable('posts', function ( table ){
    table.increments();
    table.string('title');

    table.text('description');
    table.integer('rating');
    table.integer('user_id').references('users.id');
    table.decimal('lat', 20, 10);
    table.decimal('lng', 20, 10);
    table.string('img_link');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
  .createTable('comments', function ( table ){
    table.increments();
    table.integer('user_id').references('users.id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.text('comment');
    table.integer('post_id').references('posts.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('comments')
  .dropTable('posts')
  .dropTable('users')
};
