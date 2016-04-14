var io = require('socket.io')();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

function parce (off) {
  return knex('posts')
  .innerJoin('users', 'posts.user_fk', 'users.user_id' )
  .orderBy('rating', 'desc')
  .limit(10).offset(off)
  .select('posts.title', 'posts.description', 'posts.post_id', 'posts.rating', 'users.username', 'posts.lat', 'posts.lng', 'posts.img_link', 'posts.user_fk')
}
function bounds (msg){
  return parce (msg.parce)
    .whereBetween('lat', [msg.bounds.south, msg.bounds.north])
    .whereBetween('lng', [msg.bounds.west, msg.bounds.east])
}

function rrr (rating) {
  return knex('posts').where({post_id: rating.id})
  .increment('rating', rating.add)
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
      bounds(msg)
          .then( function (post){
            io.sockets.connected[socket.id].emit('self', post);
          })

  })
  socket.on('user', function (userId){
    parce(0)
      .where({'users.user_id': userId})
      .then( function (userPosts) {
        io.sockets.connected[socket.id].emit('user', userPosts);
      })
  })
  socket.on('rating', function (rating) {
    rrr(rating).then(function () {
      bounds(rating)
        .then( function (post){
          io.sockets.connected[socket.id].emit('self', post);
        })
    })
  })
  socket.on('notlocated', function (rating) {
    rrr(rating).then(function(){
      parce(rating.parce)
      .then( function (posts){
        io.sockets.connected[socket.id].emit('self', posts);
      })
    })
  })
});

module.exports = io;
