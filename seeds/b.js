exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').del(),
    knex('posts').insert({ title: 'testing', description: 'this is a test', rating: 500, user_id: 1, lat: 40.0150, lng: -105.2705, img_link: null }),
    knex('posts').insert({ title: 'test 2', description: 'this is the second test', rating: 100, user_id: 1, lat: 40.0130, lng: -105.2805, img_link: null })
  );
};
