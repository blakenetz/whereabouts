
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.string('auth_id');
    table.string('auth_strategy');
  })

};

exports.down = function(knex, Promise) {
 return knex.schema.table('users', function (table){
   table.dropColumn('auth_id');
   table.dropColumn('auth_strategy');
 })
};
