var app = require('express')();
var config = require('../config.js')

var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(config.socketPort, function () {
    console.log(`🚀 SocketServer listening on ${config.socketPort}`);
});

io.on('connection', function(socket) {
    console.log('client connected');
})

exports.socketSend = function (type, msg) {
    io.sockets.emit(type, msg);
}
