var io = require('socket.io')();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

function parce () {
  return knex('posts')
  .leftJoin('users', 'posts.user_id', 'users.id' )
  .orderBy('rating', 'desc')
  .select('posts.title', 'posts.description', 'posts.id', 'posts.rating', 'users.username', 'posts.lat', 'posts.lng', 'posts.img_link', 'posts.user_id')
}

io.on('connection', function (socket) {
  parce()
  .then( function (post) {
    io.sockets.connected[socket.id].emit('self', post);
  })

  socket.on('located', function (msg){
      parce()
        .whereBetween('lat', [msg.south, msg.north])
        .whereBetween('lng', [msg.west, msg.east])
          .then( function (post){
            io.sockets.connected[socket.id].emit('self', post);
          })

    })

});

module.exports = io;
