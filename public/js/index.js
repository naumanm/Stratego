// Stratego, by mikeNauman

$( document ).ready(function() {

  var socket = io();
  var playerName1 = null;
  var playerName2 = null;
  var currentPlayer = null;

  function comunicator() {

    document.getElementById("nameButton").addEventListener("click", function( event ) {
      var name = document.getElementById("textArea").value;
      currentPlayer = name;
      console.log(currentPlayer);
      socket.emit('playerName', name);
    }, false);

    document.getElementById("readyButton").addEventListener("click", function( event ) {
      console.log('1 ' + playerName1);
      console.log('2 ' + playerName2);
      console.log('current ' + currentPlayer);

      if (playerName1 === currentPlayer) {
        socket.emit('player1Ready', 'true');
        console.log("player1Ready");
      } else if (playerName2 === currentPlayer) {
        socket.emit('player2Ready', 'true');
        console.log("player2Ready");
      }
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
      console.log("setBoard");
      setUIForGame();
    });

    socket.on('gameBoardLocked', function(value) {
      console.log('board is locked');
      $('#startGame').replaceWith($('<h2 id="startGame">').text('Board is locked'));
    });

    socket.on('fromServerToClientTurn', function(object) {
      console.log('From server');
      console.log(object);
    });

    document.getElementById("shootButton").addEventListener("click", function( event ) {
      var x = 3;
      var y = 4;
      var pieceValue = 3;
      shotObj = {player: currentPlayer, xposition: x, yposition: y, turnValue: pieceValue};
      console.log('to server');
      console.log(shotObj);
      socket.emit('fromClientToServerTurn', shotObj);
    });

    function setName(playerName, name) {
      $('#' + playerName).replaceWith($('<h2 id=' + playerName + '>').text(playerName + " " +name));
      socket.emit(playerName, name);
    }

    function removeNameSetupUI (){
      document.getElementById("textArea").remove();
      document.getElementById("nameButton").remove();
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
      $('#startGame').replaceWith($('<h2 id="startGame">').text('Place your pieces'));
      //removeNameSetupUI`();
      console.log(gameBoard);
      console.log(currentPlayer);
    }
  }

  // main
  document.getElementById("gameBoard").hidden=true;
  comunicator();

});
