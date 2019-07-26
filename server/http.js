var express = require('express');
var httpServer = express();
var config = require("../config.js")

module.exports = class Server {

    constructor(port, adress) {
        this.app = httpServer
        this.port = port || 3000
        this.adress = adress
    }

    getApp() {
        return this.app
    }

    run() {

        this.app.use('/public', express.static(__dirname + '/../public'));

        this.app.listen(this.port, this.adress, () => {
            console.log(`🚀 HTTP Server listening on ${this.adress}:${this.port}!`);
        });
    }

}
