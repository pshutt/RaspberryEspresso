// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

//serial

var SerialPort = require('serialport');
/*
var port = new SerialPort('/dev/ttyACM0', function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
  parser: SerialPort.parsers.readline('\n');
});
*/
var port = new SerialPort('/dev/ttyACM0', {
  parser: SerialPort.parsers.readline('\n')
});

port.on('data', function (data) {
  
    io.emit('change_header', {
        header: data
    });
});

var onoff = require('onoff'); //#A
var Gpio = onoff.Gpio

  led1 = new Gpio(20, 'out') //#B
  led2 = new Gpio(21, 'out')//#B

brewOff()

var io = require('socket.io').listen(server);
	io.sockets.on('connection', function (socket) {
        //socket.emit('message', 'You are connected!');
      socket.on('message1',function(On){
        	brewOn()
        });
      socket.on('message0',function(Off){
        	brewOff()
        });


});
	

server.listen(3000);

//functions

function brewOn(){
	led1.writeSync(1); //#G
	led2.writeSync(1); //#G
}
function brewOff(){
	led1.writeSync(0); //#G
	led2.writeSync(0); //#G
}


