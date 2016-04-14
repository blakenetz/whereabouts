
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
      email: 'superadmin@example.com',
      username: 'superadmin',
      password: '$2a$10$SyMaBzAAHO3dwU9LUiEu4OmwXAgMqnnzgfgGJEJ777EOXEPHKt7e6',
      salt: 12868,
      avatar: 'http://assets.howtobecome.com/assets/images/2014/03/hacker.jpg',
      admin: true,
      auth_id: null,
      auth_strategy: null
    }),
    knex('users').insert({
      email: 'happyaddie@example.com',
      username: 'happyaddie',
      password: 'testuser',
      avatar: 'https://pixabay.com/static/uploads/photo/2014/08/02/07/09/girl-408066_960_720.jpg',
      admin: false,
      auth_id: null,
      auth_strategy: null
    }),
    knex('users').insert({
      email: 'monocasa@example.com',
      username: 'monocasa',
      password: 'testuser',
      avatar: 'https://static.pexels.com/photos/6842/light-man-new-year-hope.jpg',
      admin: false,
      auth_id: null,
      auth_strategy: null
    }),
    knex('users').insert({
      email: 'mindilynn@example.com',
      username: 'mindilynn',
      password: 'testuser',
      avatar: 'https://pixabay.com/static/uploads/photo/2015/11/07/11/54/woman-1031606_960_720.jpg',
      admin: false,
      auth_id: null,
      auth_strategy: null
    }),
    knex('users').insert({
      email: 'matticate@example.com',
      username: 'matticate',
      password: 'testuser',
      avatar: 'https://static.pexels.com/photos/21278/pexels-photo.jpg',
      admin: false,
      auth_id: null,
      auth_strategy: null
    }),
    knex('users').insert({
      email: 'suzieq@example.com',
      username: 'suzieq',
      password: 'testuser',
      avatar: 'https://static.pexels.com/photos/1654/fashion-person-woman-girl.jpg',
      admin: false,
      auth_id: null,
      auth_strategy: null
    })
  );
};
