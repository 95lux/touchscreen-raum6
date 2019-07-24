var express = require('express');
var httpServer = express();

module.exports = class Server {

    constructor(port, adress) {
        this.port = port || 3000
        this.app = httpServer
        // variable adress new!!
        // this.adress = "192.168.235.201"
        this.adress = "127.0.0.1"
    }

    getApp() {
        return this.app
    }

    run() {

        this.app.use('/public', express.static(__dirname + '/../public'));
        this.app.use('/dist', express.static(__dirname + '/../dist'));

        this.app.listen(this.port, this.adress, () => {
            console.log(`HTTP Server listening on ${this.adress}:${this.port}!`);
        });
    }

}
