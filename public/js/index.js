// Stratego, by mikeNauman

$( document ).ready(function() {

  var socket = io();
  var playerName1 = null;
  var playerName2 = null;
  var currentPlayer = null;

  document.getElementById("readyButton").hidden=true;
  document.getElementById("shootButton").hidden=true;
  document.getElementById("gameBoard").hidden=true;

  function comunicator() {

    document.getElementById("nameButton").addEventListener("click", function( event ) {
      var name = document.getElementById("textArea").value;
      currentPlayer = name;
      socket.emit('playerName', name);
      document.getElementById("textArea").remove();
      document.getElementById("nameButton").remove();
      document.getElementById("readyButton").hidden=false;
      document.getElementById("gameBoard").hidden=false;
      $('#playerName').replaceWith($('<h2 id="playerName">').text(currentPlayer));
      $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Place your pieces'));
    }, false);

    document.getElementById("readyButton").addEventListener("click", function( event ) {
      if (playerName1 === currentPlayer) {
        socket.emit('player1Ready', 'true');
      } else if (playerName2 === currentPlayer) {
        socket.emit('player2Ready', 'true');
      }
      document.getElementById("readyButton").remove();
      document.getElementById("gameBoard").hidden=false;
      $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Board is locked'));
    }, false);

    socket.on('playerName1', function(name){
      setName('playerName1', name);
      playerName1 = name;
    });

    socket.on('playerName2', function(name){
      setName('playerName2', name);
      playerName2 = name;
    });

    socket.on('setBoard', function(value){
      setUIForGame();
    });

    socket.on('gameBoardLocked', function(value) {
      document.getElementById("playerName").remove();
      if (currentPlayer === playerName1) {
        document.getElementById("shootButton").hidden=false;
        $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text(playerName1 + ' your shot!'));
      } else {
        document.getElementById("shootButton").hidden=true;
        $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Waiting for ' + playerName1));
      }
    });

    // listens for the other persons shot
    socket.on('fromServerToClientTurn', function(object) {
      if (currentPlayer === object.player) {
        document.getElementById("shootButton").hidden=false;
        $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text(object.player + ' your shot!'));
      } else {
        document.getElementById("shootButton").hidden=true;
        $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Waiting for ' + object.player));
      }
    });

    // initiates each turn
    document.getElementById("shootButton").addEventListener("click", function( event ) {
      var x = 3;
      var y = 4;
      var pieceValue = 3;
      shotObj = {player: currentPlayer, xposition: x, yposition: y, turnValue: pieceValue};
      console.log('to server');
      console.log(shotObj);
      socket.emit('fromClientToServerTurn', shotObj);
      document.getElementById("shootButton").hidden=true;
    });

    function setName(playerName, name) {
      //$('#playerName').replaceWith($('<h2 id="playerName">').text(playerName + " " + name));
      socket.emit(playerName, name);
    }

    function createGameBoardArr() {
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

    function setUIForGame() {
      var gameBoard = createGameBoardArr();
      document.getElementById("gameBoard").hidden=false;
      $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Place your pieces'));
      console.log(gameBoard);
      console.log(currentPlayer);
    }
  }

  // main
  document.getElementById("gameBoard").hidden=true;
  comunicator();

});
