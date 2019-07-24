var ctx = document.getElementById('my_canvas').getContext('2d');
var al = 0;

// atl =  time to load in ms
var atl = 12000;
var start = 4.72
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;



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
      console.log('test');
    }
    al++;
  }

  var sim = setInterval(progressSim, 50);
