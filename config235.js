module.exports = {
    socketPort: 5012,
    httpPort: 3000,
    udpServers: [{
        host: '192.168.235.12',
        // host: '127.0.0.1',
        port: 5000
    }],
    udpClients: [{
        //VideoServer MadMapper
        // host: '192.168.235.12',
        host: '192.168.235.216',
        port: 5000
    },{
        //VideoServer MadMapper
        // host: '192.168.235.12',
        host: '192.168.235.216',
        port: 2350
    }]
};
