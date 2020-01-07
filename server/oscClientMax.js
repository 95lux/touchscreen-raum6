var config = require('../config.js');

const OSC = require('osc-js')

var HOST = config.udpClients[1].host;
var PORT = config.udpClients[1].port;
const plugin = new OSC.DatagramPlugin({ send: { port: PORT, host: HOST }})
const osc = new OSC({ plugin: plugin })

var response = function(err, bytes) {
    if (err) throw err;
    console.log('OSC message sent to ' + HOST +':'+ PORT);
}

module.exports = (message, callback) => {

    const msgToMax = new OSC.Message(message);
        osc.send(msgToMax);
}
