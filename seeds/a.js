nodexports.seed = function(knex, Promise) {

    return knex('posts').del().then(function(){
      return knex('users').del().then(function(){
        return knex('users').insert({
          username: 'blake'
        }).returning('id').then(function(userId){
          return knex('posts').insert([{
            title: 'testing',
            description: 'this is a test 1',
            rating: 500,
            user_id: userId[0],
            lat: 40.0150,
            lng: -105.2705,
            img_link: null,
          },{
            title: 'testing2',
            description: 'this is a test 2',
            rating: 400,
            user_id: userId[0],
            lat: 40.0250,
            lng: -105.2715,
            img_link: null,
          },{
            title: 'testing3',
            description: 'this is a test 3',
            rating: 300,
            user_id: userId[0],
            lat: 40.0240,
            lng: -105.2735,
            img_link: null,
          }]);
      });
    });
  });
};
