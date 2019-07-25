var socketIO = require('socket.io-client');
var axios = require('axios');
var config = require('../config.js');

// loaderApp variables
var ctx = document.getElementById('my_canvas').getContext('2d');
var al = 0;
var sim = setInterval(progressSim, 50);

// atl =  time to load in ms
var atl = 12000;
var start = 4.72
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;

function log(data) {
    console.log(data)
}

function send(event, action1, action2, action3) {

    // stops following href url in link and stay
    // event.preventDefault();

    console.log(event, action1, action2, action3);

    // http://localhost:3000/play/wetter
    // then success
    // catch error
    axios.get(`http://localhost:${config.httpPort}/send/0/play/` + action1).then(log).catch(log);
    axios.get(`http://localhost:${config.httpPort}/send/1/play/` + action2).then(log).catch(log);
    axios.get(`http://localhost:${config.httpPort}/send/2/play/` + action3).then(log).catch(log);
}

// socket.io client io
var socket = socketIO(`http://localhost:${config.socketPort}`);

//socket.io events
socket.on('connection', function() {
    console.log('client connected to server!');
});

socket.on('transport', function(msg) {
    console.log('start is emited!');
});

socket.on('duration', progressSim);

function progressSim(length) {

    diff = ((al / length*50) * Math.PI * 2 * 10).toFixed(2);

    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#09F";
    ctx.beginPath();

    // .arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
    ctx.arc(77.5, 77.5, 72.5, start, diff / 10 + start, false);
    ctx.stroke();

    if (al >= (length/50)) {
        clearTimeout(sim);
        console.log('test');
    }
    al++;
}
