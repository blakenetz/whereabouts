var io = require('socket.io')();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

function parce (off) {
  return knex('posts')
  .innerJoin('users', 'posts.user_fk', 'users.user_id' )
  .orderBy('rating', 'desc')
  .limit(2).offset(off)
  .select('posts.title', 'posts.description', 'posts.post_id', 'posts.rating', 'users.username', 'posts.lat', 'posts.lng', 'posts.img_link', 'posts.user_fk')
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
  socket.on('user', function (userId){
    parce()
      .where({'users.user_id': userId})
      .then( function (userPosts) {
        io.sockets.connected[socket.id].emit('user', userPosts);
      })
  })

});

module.exports = io;
