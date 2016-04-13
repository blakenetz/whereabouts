
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function ( table ){
    table.increments('user_id');
    table.string('email').unique();
    table.string('username').unique();
    table.string('password');
    table.integer('salt');
    table.string('avatar');
    table.boolean('admin').defaultTo(false);
    table.string('auth_id');
    table.string('auth_strategy');
  })
  .createTable('posts', function ( table ){
    table.increments('post_id');
    table.string('title');
    table.text('description');
    table.integer('rating');
    table.integer('user_fk').references('users.user_id').onDelete('cascade').onUpdate('cascade');
    table.decimal('lat', 20, 10);
    table.decimal('lng', 20, 10);
    table.string('img_link');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
  .createTable('comments', function ( table ){
    table.increments('comment_id');
    table.integer('user_fk').references('users.user_id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.text('comment');
    table.integer('post_fk').references('posts.post_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('comments')
  .dropTable('posts')
  .dropTable('users')
};
