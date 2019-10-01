function reqListener () {
  console.log(this.responseText);
}

var httpCall1 = new XMLHttpRequest();
var httpCall2 = new XMLHttpRequest();
var httpCall3 = new XMLHttpRequest();


function preventLoading() {
  event.preventDefault();
  console.log("HTML to be created!");
}

function send1(event, action1, action2, action3) {
  console.log(event, action1, action2, action3);


  // event.preventDefault();

  // http://localhost:3000/play/wetter

  // for the BrightSign A (Topografie)
  httpCall1.open("GET", "http://192.168.235.201:3000/play1/" + action1);
  httpCall1.send();
  // for the BrightSign B (Screen)
  httpCall2.open("GET", "http://192.168.235.201:3000/play2/" + action2);
  httpCall2.send();
  // For the Tuomo Bloototh-Controller (Multimedia Guide)
  httpCall3.open("GET", "http://192.168.235.201:3000/play3/" + action3);
  httpCall3.send();
}
