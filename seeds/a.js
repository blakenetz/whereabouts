exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').del(),
    knex('users').del(),
    knex('users').insert({ username: 'blake', avatar: null })
  );
};
