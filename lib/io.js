var io = require('socket.io')();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);


io.on('connection', function (socket) {
  socket.on('self', function (msg){
    knex('posts')
    .leftJoin('users', 'posts.user_id', 'users.id' )
    .whereBetween('lat', [msg.south, msg.north])
    .whereBetween('lng', [msg.west, msg.east])
    .select('posts.title', 'posts.description', 'posts.id', 'posts.rating', 'users.username', 'posts.lat', 'posts.lng')
    // .orderBy('rating', 'dest')
    .then( function (post){
      io.sockets.connected[socket.id].emit('self', post);
    })
  })
});

module.exports = io;
