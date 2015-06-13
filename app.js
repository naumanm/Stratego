// Stratego, by mikeNauman

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function setUp() {
  app.set("view engine", "ejs");
  app.use(express.static(__dirname + '/public'));
  app.get('/', function(req, res){
    res.render('index.ejs');
  });
}

function configSocketIO() {
  // communication
  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('connectToGame', function(msg){
      console.log(msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
}

function createGameBoard() {
  var gameBoardArr = [];

  function Cell(occupied, team, value, x, y) {
    this.x = x;
    this.y = y;
    this.occupied = occupied;
    this.team = team;
    this.value = value;
  }

  for (var i = 1; i < 11; i++){
    for (var j = 1; j < 11; j++) {
      gameBoardArr.push(new Cell(false, false, false, j, i));

    }
  }

  return gameBoardArr;
}

// main
setUp();
configSocketIO();
gameBoard = createGameBoard();
