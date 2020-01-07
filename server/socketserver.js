var app = require('express')();
var config = require('../config.js')

var oscClient = require('./oscClient.js');
var oscClientMax = require('./oscClientMax.js');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(config.socketPort, function () {
    console.log(`SocketServer listening on ${config.socketPort}`);
});

io.on('connection', function(socket) {
    console.log('client connected');

    socket.on('video', function(msg){
        console.log(msg);
        var videoName = msg;

        oscClient(videoName, (error, bytes) => {

          if (error) {
            res.json({
              error: error
            })
          }

          res.json({
            command: req.params.action,
            bytes: bytes
          })
        })

        oscClientMax(videoName, (error, bytes) => {

          if (error) {
            res.json({
              error: error
            })
          }

          res.json({
            command: req.params.action,
            bytes: bytes
          })
        })
    })


})

exports.socketSend = function (type, msg) {
    io.sockets.emit(type, msg);
}
