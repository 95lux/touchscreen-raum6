var app = require('express')();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(5002, function () {
    console.log('SocketServer listening on :5002');
});

io.on('connection', function(socket) {
    console.log('client connected');
})

exports.socketSend = function (type, msg) {
    io.sockets.emit(type, msg);
}
