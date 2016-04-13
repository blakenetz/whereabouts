
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert({title: 'This Is A Test 1',
                          description: 'This is a description of the things!',
                          rating: 530,
                          user_id: 3,
                          lat: 40.0150,
                          lng: -105.2705,
                          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
                        }),
    knex('posts').insert({title: 'This Is A Test 2',
                          description: 'This is another description of the things!',
                          rating: 300,
                          user_id: 1,
                          lat: 40.0155,
                          lng: -105.2704,
                          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
                        }),
    knex('posts').insert({title: 'This Is A Test 3',
                          description: 'This is a still another description of the things!',
                          rating: 100,
                          user_id: 3,
                          lat: 40.0157,
                          lng: -105.2701,
                          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
                        }),
    knex('posts').insert({title: 'This Is A Test 4',
                          description: 'This is another description of the things!',
                          rating: 230,
                          user_id: 2,
                          lat: 40.0159,
                          lng: -105.269,
                          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
                        }),
    knex('posts').insert({title: 'This Is A Test 5',
                          description: 'This is a still another description of the things!',
                          rating: 260,
                          user_id: 2,
                          lat: 40.0156,
                          lng: -105.2732,
                          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
                        })
  );
};
