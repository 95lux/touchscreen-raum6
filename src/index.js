var io = require('socket.io-client');
var axios = require('axios');
var config = require('../config.js');

// socket.io client io
var socket = io(`http://localhost:${config.socketPort}`, {
    forceNew: true,
    reconnection: true,
    reconnectionDelay: 8000,
    reconnectionAttempts: 99999
});

// loaderApp variables
var ctx = document.getElementById('loader_canvas').getContext('2d');
var al = 0;
// atl =  time to load in ms
var atl = 0;
var start = 4.72
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;

var isBlocked = false

var strokeStyles = ['#ff8228',
                    '#c7ff36',
                    '#ffcd48'];

var videoDurations =    [170000,
                         143000,
                         140000];
function log(data) {
    console.log(data)
}
function startIdle(){
    // start idle event after loading page
    // axios.get(`http://localhost:${config.httpPort}/send/0/C-IDLE`).then(log).catch(log);
    console.log('test');
    socket.emit('video', 'C-IDLE');

}
window.onload = startIdle();


window.clickHandler = function(event, action1, popup) {
    sendEvent(event, action1);
    show(event, popup);
}

sendEvent = function(event, action1) {
    // console.log(event);
    var category = action1.substring(2,3);
    category = parseInt(category, 10)
    console.log(category);
    console.log(strokeStyles[category]);
    // event.preventDefault();

    if (isBlocked) {
        //VIDEO BLOCK HIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // event.preventDefault();
        console.log('video blocked!');
        return false;

    } else {
        ctx.strokeStyle = strokeStyles[category-1];

        // axios.get(`http://localhost:${config.httpPort}/send/0/` + action1).then(log).catch(log);
        // console.log(action1);
        socket.emit('video', action1);
    }
    //VIDEO BLOCK HIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // if (isBlocked) {
            //     console.log('bar blocked');
            //     return false
            // }
            //isBlocked = true
                atl = videoDurations[action1.substring(2,3) - 1];
                function progressSim() {
                        diff = ((al / atl*50) * Math.PI * 2 * 10).toFixed(2);
                        ctx.clearRect(0, 0, cw, ch);
                        ctx.lineWidth = 19;

                        // ctx.strokeStyle = "#09F";
                        ctx.beginPath();
                        // .arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
                        ctx.arc(150, 152, 128, start, diff/10+start, false);
                        ctx.stroke();
                        if (al >= (atl/50)) {
                            clearTimeout(sim);
                            console.log('video finished');
                            ctx.clearRect(0, 0, cw, ch);
                            al = 0;
                            // window.location.href = "/index.html"
                            // document.getElementsByclassName('popup').style.display ='none';
                            var x = document.getElementsByClassName("popup");
                            var i;
                            for (i = 0; i < x.length; i++) {
                                x[i].style.display = 'none';
                            }
                            // send idle event after playing video
                            startIdle();
                        }
                        al++;
                }
                var sim = setInterval(progressSim, 50)
                // setTimeout(function () {
                //     isBlocked = false
                //     console.log('bar unblocked');
                // }, msgDuration)
}



//socket.io events
// socket.on('connection', function() {
//     console.log('client connected to server!');
// });
//
//
// socket.on('videoNumber', function(msg) {
//     console.log(msg);
//
// });




show = function (event, id){
    // console.log(event);
    // console.log(event.sourceCapabilities.firesTouchEvents);
    // if(event.type == "click" && event.sourceCapabilities.firesTouchEvents) {
    //     console.log("touch via mousdown event triggered");
    //     return;
    // } else {
        document.getElementById(id).style.display ='block';
    // }

}
