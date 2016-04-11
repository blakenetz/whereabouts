
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
    table.string('description', 2500);
    table.integer('rating');
    table.integer('user_id').unsigned().references('users.id');
    table.decimal('lat', 20, 10);
    table.decimal('lng', 20, 10);
    table.string('imgLink', 500);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
  .createTable('comments', function ( table ){
    table.increments();
    table.integer('user_id').unsigned().references('users.id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.string('comment', 1000);
    table.integer('post_id').unsigned().references('posts.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('comments')
  .dropTable('posts')
  .dropTable('users')
};
