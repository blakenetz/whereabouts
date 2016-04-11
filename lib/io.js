var io = require('socket.io')();

io.on('connection', function (socket) {

 socket.emit('messageFeed', {test: 'messageExample'});

});

module.exports = io;
