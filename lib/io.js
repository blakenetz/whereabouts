var io = require('socket.io')();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

function parce (off) {
  return knex('posts')
  .leftJoin('users', 'posts.user_id', 'users.id' )
  .orderBy('rating', 'desc')
  .limit(1).offset(off)
  .select('posts.title', 'posts.description', 'posts.id', 'posts.rating', 'users.username', 'posts.lat', 'posts.lng', 'posts.img_link', 'posts.user_id')
}

io.on('connection', function (socket) {
  parce(0)
  .then( function (post) {
    io.sockets.connected[socket.id].emit('self', post);
  })
  socket.on('world', function (msg){
    parce(msg)
    .then( function (post) {
      io.sockets.connected[socket.id].emit('self', post);
    })
  })
  socket.on('located', function (msg){
      parce(msg.parce)
        .whereBetween('lat', [msg.bounds.south, msg.bounds.north])
        .whereBetween('lng', [msg.bounds.west, msg.bounds.east])
          .then( function (post){
            io.sockets.connected[socket.id].emit('self', post);
          })

    })

});

module.exports = io;
