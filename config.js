module.exports = {
    socketPort: 5012,
    httpPort: 3000,
    udpServers: [{
        host: '127.0.0.1',
        port: 5000
    }],
    udpClients: [{
        //VideoServer MadMapper
        host: '192.168.200.66',
        port: 5000
    }, {
        //VideoServer MaxPlayer
        host: '192.168.200.66',
        port: 2350
    }]
};
