//var mongojs = require("mongojs");
//var db = mongojs('localhost:27017/myGame', ['account']);

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/pub/index.html');
});
app.use('/pub',express.static(__dirname + '/pub'));

serv.listen(process.env.PORT || 80);
console.log("Server started.");

var socketList = {};
var playerList = {};

var Player = require('./player.js');

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	console.log("Client " + socket.id + " connected.");

	var player = Player(socket.id);
	playerList[socket.id] = player;

	socketList[socket.id] = socket;

	socket.on('kP', function(p) {
		if(p.input === 'left')
			player.keyLeft = p.state;
		else if(p.input === 'right')
			player.keyRight = p.state;
		else if(p.input === 'up')
			player.keyUp = p.state;
		else if(p.input === 'down')
			player.keyDown = p.state;
	});

	socket.on('disconnect',function(){
		delete playerList[socket.id];
		delete socketList[socket.id];
	});

});

setInterval(function(){
	var pack = [];
	for(var p in playerList){
		var player = playerList[p];

		//Check what's going on
		player.updatePos();

		//Push data to packet
		pack.push({
			x:player.x,
			y:player.y,
			r:player.r,
			g:player.g,
			b:player.b
		});
	}
	for(var s2 in socketList){
		var socket2 = socketList[s2];
		socket2.emit('nP',pack);
	}




},1000/25);