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

// beispiel: http://localhost:3000/0/A-2_0
httpServer.app.get('/send/:connection/:video', (req, res, next) => {

    var connection = config.udpClients[req.params.connection];
    var videoName = req.params.video

    udpClient(connection).send(videoName, (error, bytes) => {

        res.json({
            error: error,
            video: videoName,
            connection: connection,
            bytes: bytes
        })
    })

})

httpServer.run()
