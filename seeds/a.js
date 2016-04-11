
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),
    knex('users').insert({
      username: 'blake',
      avatar: null
    }),
    knex('posts').del(),
    knex('posts').insert({
      title: 'testing',
      description: 'this is a test',
      rating: 500,
      user_id: 1,
      lat: 40.0150,
      lng: -105.2705,
      imgLink: null
    })
  );
};
