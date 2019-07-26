module.exports = {
    socketPort: 50012,
    httpPort: 4100,
    udpServers: [{
        // host: '192.168.235.201',
        host: '192.168.235.201',
        port: 5000
    }],
    udpClients: [{
        host: '192.168.235.42',
        port: 5000
    }, {
        host: '192.168.235.201',
        port: 5000
    }, {
        host: '192.168.235.200',
        port: 5000
    }]
};
