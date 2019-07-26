var path = require('path');
var Server = require('./http.js');

var udpClient = require('./udpClient.js');
var udpServer = require('./udpServer.js');
var socketServer = require('./socketserver.js');
var config = require('../config.js');

var httpServer = new Server(config.httpPort, 'localhost');

// start udp server with given connection information
udpServer(config.udpServers[0], socketServer);

var templateBaseURL = __dirname + '/../templates/';

// serve static html pages
// beispiel: http://localhost:3000/klima
httpServer.app.get('/:page?', (req, res, next) => {
    var page = req.params.page || 'index.html';
    
    res.sendFile(path.join(templateBaseURL + page));
})

// beispiel: http://localhost:3000/0/play/A-2_0
httpServer.app.get('/send/:connection/:video', (req, res, next) => {
    // console.log(config)
    // console.log(req.params)
    console.log(config.udpClients[req.param.connection]);
    console.log(config.udpClients[req.param.video]);
    // hol dir aus dem array die connection
    var connection = config.udpClients[req.param.connection];

    // event ist play oder pause oder stop
    // var eventType = req.param.event

    // video steht für das video, welches abgespielt werden soll
    var video = req.param.video

    udpClient(connection).send(req.param.video, (error, bytes) => {

        res.json({
            error: error,
            command: video,
            bytes: bytes
        })
    })

})

httpServer.run()
