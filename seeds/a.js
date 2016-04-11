exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').del(),
    knex('posts').insert({
      title: 'testing',
      description: 'this is a test',
      rating: 500,
      user_id: 1,
      lat: 40.0150,
      lng: -105.2705,
      imgLink: null
    }),
    knex('posts').insert({
      title: 'testing1',
      description: 'this is a test',
      rating: 400,
      user_id: 1,
      lat: 40.0250,
      lng: -105.2715,
      imgLink: null
    }),
    knex('posts').insert({
      title: 'testing2',
      description: 'this is a test',
      rating: 300,
      user_id: 1,
      lat: 40.0240,
      lng: -105.2735,
      imgLink: null
    })
  );
};
