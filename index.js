const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'ws://esp8266@broker.emqx.io:8083/mqtt'

const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'esp8266/tester',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
}

console.log('connecting mqtt client')
const client = mqtt.connect(host, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('connect', () => {
  console.log('Client connected:' + clientId)
  client.subscribe('esp8266/tester', { qos: 0 })
  client.publish('esp8266/tester', 'ws connection demo...!', { qos: 0, retain: false })
})

client.on('message', (topic, message, packet) => {
  console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
  if(message=="open")
  {
    document.getElementById("state").innerHTML = "The door is currently : Open";

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        document.getElementById("openTime").innerHTML = dateTime;
        document.getElementById("Open").disabled = true;
        document.getElementById("Close").disabled = false;
  }
  else if (message=="closed")
  {
    document.getElementById("Close").disabled = true;
  document.getElementById("Open").disabled = false;
    document.getElementById("state").innerHTML = "The door is currently : Close";
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        document.getElementById("closeTime").innerHTML = dateTime;
  }
  else if (message=="Intruder")
  {
    window.alert("Someone is accessing the garage");
  }
})

client.on('close', () => {
  console.log(clientId + ' disconnected')
})

function openDoor() {
    client.publish('esp8266/tester', '7', {
        qos: 0,
        retain: false
    })
}

function openDoor(){


  client.publish('esp8266/tester', '7', {
    qos: 0,
    retain: false
})
   
}

function closeDoor() {


    client.publish('esp8266/tester', '6', {
        qos: 0,
        retain: false
    })
}

function closeDoor(){

  client.publish('esp8266/tester', '6', {
    qos: 0,
    retain: false
})

  
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
