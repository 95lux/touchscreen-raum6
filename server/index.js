var path = require('path');
var Server = require('./http.js');

var udpClient = require('./udpClient.js');
var udpServer = require('./udpServer.js');
var socketServer = require('./socketserver.js');

const udpServers = [{
    // host: '192.168.235.201',
    host: '127.0.0.1',
    port: 5000
}]

const udpClients = [{
    host: '192.168.235.42',
    port: 5000
}, {
    host: '192.168.235.201',
    port: 5000
}, {
    host: '192.168.235.200',
    port: 5000
}];

var httpServer = new Server(3000);

// start udp server with given connection information
udpServer(udpServers[0], socketServer);

var templateBaseURL = __dirname + '/../';

// serve static html pages
// beispiel: http://localhost:3000/klima
httpServer.app.get('/:page?', (req, res, next) => {
    var page = req.params.page || 'index';

    res.sendFile(path.join(templateBaseURL + page + '.html'));
})

// beispiel: http://localhost:3000/0/play/A-2_0
httpServer.app.get('/:connection/:event/:video', (req, res, next) => {

    // hol dir aus dem array die connection
    var connection = udpClients[req.params.connection]

    // event ist play oder pause oder stop
    var eventType = req.params.event

    // video steht für das video, welches abgespielt werden soll
    var video = req.params.video

    udpClient(connection).send(req.params.video, (error, bytes) => {

        res.json({
            error: error,
            command: video,
            bytes: bytes
        })
    })

})

httpServer.run()
