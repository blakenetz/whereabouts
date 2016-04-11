
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function ( table ){
    tables.increments();
    table.string('username');
    table.string('password');
    table.boolean('admin');
  })
};

exports.down = function(knex, Promise) {

};
