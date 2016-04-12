
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({email: 'nickpmacintyre@gmail.com',
                          username: 'nickmac23',
                          password: 'admin',
                          avatar: 'http://assets.howtobecome.com/assets/images/2014/03/hacker.jpg',
                          admin: true,
                          auth_id: null,
                          auth_strategy: null
                        }),
    knex('users').insert({email: 'blake.netzeband@gmail.com',
                          username: 'blackeface',
                          password: 'admin',
                          avatar: 'http://assets.howtobecome.com/assets/images/2014/03/hacker.jpg',
                          admin: true,
                          auth_id: null,
                          auth_strategy: null
                        }),
    knex('users').insert({email: 'summer.wollin@gmail.com',
                          username: 'summerwollin',
                          password: 'admin',
                          avatar: 'http://assets.howtobecome.com/assets/images/2014/03/hacker.jpg',
                          admin: true,
                          auth_id: null,
                          auth_strategy: null
                        })
  );
};


// test
