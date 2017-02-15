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

var port = new SerialPort('/dev/ttyACM0', function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
  parser: SerialPort.parsers.readline('\n');
});
/*
var port = new SerialPort('/dev/ttyACM0', {
  parser: SerialPort.parsers.readline('\n')
});
*/


port.on('data', function (data) {
  
    io.emit('change_header', {
        header: data
    });
});

var onoff = require('onoff'); //#A
var Gpio = onoff.Gpio

	level = new Gpio(5, 'in', 'both')
	group = new Gpio(6, 'out') 
 	pump = new Gpio(13, 'out')
 	element = new Gpio(19, 'out') 
 	fill = new Gpio(26, 'out')

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
level.watch(function(err,waterLevel){
	if(waterLevel == 1){
		//do nothing
		fillBoilerOff();
	} else {
		fillBoilerOn();
		//fill boiler
	}
});


function brewOn(){
	groupOn();
	pumpOn();
}
function brewOff(){
	groupOff();
	pumpOff();
}

function preOn(){
	groupOn();
}
function preOff(){
	groupOff()
}

function fillBoilerOn(){
	fillOn();
	pumpOn();
}
function fillBoilerOff(){
	fillOff();
	pumpOff();
}





function groupOn(){
	group.writeSync(1);
}

function groupOff(){
	group.writeSync(0);
}

function pumpOn(){
	pump.writeSync(1);
}

function brewOff(){
	pump.writeSync(0);
}

function elementOn(){
	element.writeSync(1);
}

function elementOff() {
	element.writeSync(0);
}

function fillOn(){
	fill.writeSync(1);
}

function fillOff(){
	fill.writeSync(0);
}







