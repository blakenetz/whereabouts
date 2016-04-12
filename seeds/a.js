
exports.seed = function(knex, Promise) {
  return knex('posts').del().then(function(){
    return knex('users').del().then(function(){
      return knex('users').insert([{
        email: 'nickpmacintyre@gmail.com',
        username: 'nickmac23',
        password: 'admin',
        avatar: 'http://assets.howtobecome.com/assets/images/2014/03/hacker.jpg',
        admin: true,
        auth_id: null,
        auth_strategy: null
      },{
        email: 'blake.netzeband@gmail.com',
        username: 'blackeface',
        password: 'admin',
        avatar: 'http://assets.howtobecome.com/assets/images/2014/03/hacker.jpg',
        admin: true,
        auth_id: null,
        auth_strategy: null
      },{
        email: 'summer.wollin@gmail.com',
        username: 'summerwollin',
        password: 'admin',
        avatar: 'http://assets.howtobecome.com/assets/images/2014/03/hacker.jpg',
        admin: true,
        auth_id: null,
        auth_strategy: null
      }]).returning('id').then(function(userID){
        return knex('posts').insert([{
          title: 'This Is A Test 1',
          description: 'This is a description of the things!',
          rating: 500,
          user_id: userId[0],
          lat: 40.0150,
          lng: -105.2705,
          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
        }, {
          title: 'This Is A Test 2',
          description: 'This is another description of the things!',
          rating: 500,
          user_id: userId[0],
          lat: 40.0155,
          lng: -105.2704,
          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
        }, {
          title: 'This Is A Test 3',
          description: 'This is a still another description of the things!',
          rating: 500,
          user_id: userId[0],
          lat: 40.0157,
          lng: -105.2701,
          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
        }, {
          title: 'This Is A Test 4',
          description: 'This is another description of the things!',
          rating: 500,
          user_id: userId[0],
          lat: 40.0159,
          lng: -105.269,
          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
        }, {
          title: 'This Is A Test 5',
          description: 'This is a still another description of the things!',
          rating: 500,
          user_id: userId[0],
          lat: 40.0156,
          lng: -105.2732,
          img_link: 'http://www.wherecoolthingshappen.com/wp-content/uploads/2013/05/unbelievable29.png'
        }]);
      });
    });
  });
}
