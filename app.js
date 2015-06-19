// Stratego, by mikeNauman

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var playerName1 = null;
var playerName2 = null;

var gameBoard = null;
var teamA = null;
var teamB = null;

player1Ready = false;
player2Ready = false;

function setUp() {
  app.set("view engine", "ejs");
  app.use(express.static(__dirname + '/public'));
  app.get('/', function(req, res){
    res.render('index.ejs');
  });
}

function configSocketIO() {
  io.on('connection', function(socket){
    console.log('an anonymous user connected');

    socket.on('playerName', function(name){
      if (!playerName1) {
        playerName1 = name;
        io.emit('playerName1', playerName1);
        console.log(playerName1);
      } else if (!playerName2) {
        playerName2 = name;
        io.emit('playerName1', playerName1);
        io.emit('playerName2', playerName2);
        console.log(playerName1);
        console.log(playerName2);
        setGameBoard(playerName1, playerName2);
      } else {
        io.emit('gameLocked', 'locked');
        console.log('Locking out additional players');
      }
    });

    socket.on('player1Ready', function(value){
      player1Ready = true;
      // update gameBoard, teamA, teamB
      checkReady();
    });

    socket.on('player2Ready', function(value){
      player2Ready = true;
      // update gameBoard, teamA, teamB
      checkReady();
    });

    socket.on('fromClientToServerTurn', function(object){
      console.log(object);
      io.emit('fromServerToClientTurn', turnController(object));
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
}

function setGameBoard(player1, player2) {
  io.emit('setBoard', true);
  gameBoard = createGameBoard();
  teamA = createTeam();
  teamB = createTeam();
}

function turnController(object) {
  var sendObj = {};
  if (object.player === playerName1) {
    sendObj.player = playerName2;
  } else {
    sendObj.player = playerName1;
  }
  sendObj.xposition = object.xposition;
  sendObj.yposition = object.yposition;
  sendObj.turnVlaue = object.turnValue;
  // update gameBoard, teamA, and teamB
  return sendObj;
}

function checkReady() {
  if (player1Ready && player2Ready) {
    var turnObj = {};
    console.log("gameBoardLocked");
    io.emit('gameBoardLocked', 'locked');
  }
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

function createTeam() {
  var teamArr = [];

  function pieceObj(label, value, alive, x, y) {
    this.label = label;
    this.value = value;
    this.alive = alive;
    this.x = x;
    this.y = y;
  }

  function addPieceToArray(label, teamCount, value) {
    for(var i = 0; i < teamCount; i++) {
      var newLabel = label + i;
      teamArr.push(new pieceObj(newLabel, value, false, null, null));
    }
  }

  // make the one off pieces
  teamArr.push(new pieceObj('Flag', -1, false, null, null));
  teamArr.push(new pieceObj('Marshal', 1, false, null, null));
  teamArr.push(new pieceObj('Spy', 0, false, null, null));
  teamArr.push(new pieceObj('General', 2, false, null, null));

  // make the rest
  addPieceToArray('Colonel', 2, 3);
  addPieceToArray('Major', 3, 4);
  addPieceToArray('Captain', 4, 5);
  addPieceToArray('Lieutenant', 4, 6);
  addPieceToArray('Sergeant', 4, 7);
  addPieceToArray('Miner', 5, 8);
  addPieceToArray('Scout', 8, 9);
  addPieceToArray('BOMB', 6, 0);

  return teamArr;
}

// MAIN
setUp();
configSocketIO();
