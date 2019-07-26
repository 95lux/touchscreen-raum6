var socketIO = require('socket.io-client');
var axios = require('axios');
var config = require('../config.js');

// loaderApp variables
var ctx = document.getElementById('loader_canvas').getContext('2d');
var al = 0;

// atl =  time to load in ms
var atl = 10000;
var start = 4.72
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;

function log(data) {
    console.log(data)
}

window.sendEvent = function(event, action1, action2, action3) {

    // stops following href url in link and stay
    // event.preventDefault();

    console.log(event, action1, action2, action3);

    // http://localhost:3000/play/wetter
    // then success
    // catch error
    axios.get(`http://localhost:${config.httpPort}/send/0/` + action1).then(log).catch(log);
    axios.get(`http://localhost:${config.httpPort}/send/1/` + action2).then(log).catch(log);
    axios.get(`http://localhost:${config.httpPort}/send/2/` + action3).then(log).catch(log);
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

socket.on('duration', function(msg) {
    var sim = setInterval(progressSim, 50)
    atl = msg;
    console.log(atl);
    function progressSim() {

            diff = ((al / atl*50) * Math.PI * 2 * 10).toFixed(2);
            ctx.clearRect(0, 0, cw, ch);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#09F";
            ctx.beginPath();

            // .arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
            ctx.arc(77.5, 77.5, 72.5, start, diff / 10 + start, false);
            ctx.stroke();
            if (al >= (atl/50)) {
                clearTimeout(sim);
                console.log('video finished');
                ctx.clearRect(0, 0, cw, ch);
                al = 0;
            }
            al++;
            // console.log(`${al} / ${atl}`);
        }
});
