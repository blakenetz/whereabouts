
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function ( table ){
    tables.increments();
    
  })
};

exports.down = function(knex, Promise) {

};
