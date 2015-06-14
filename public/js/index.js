$( document ).ready(function() {

  var socket = io();
  var playerName1 = null;
  var playerName2 = null;

  function comunicator() {

    document.getElementById("gameBoard").hidden=true;

    document.getElementById("nameButton").addEventListener("click", function( event ) {
      var name = document.getElementById("textArea").value;
      socket.emit('playerName', name);
    }, false);

    socket.on('playerName1', function(name){
      setName('playerName1', name);
    });

    socket.on('playerName2', function(name){
      setName('playerName2', name);
    });

    socket.on('startGame', function(value){
      setUIForGame();
    });

    socket.on('gameLocked', function(value) {
      if (value === 'locked') {
        $('#playerName1').replaceWith($('<h2>').text("Game is locked"));
        // document.getElementById("playerName1").value = "Game is locked";

        removeNameSetupUI();
      }
    });

    function setName(playerName, name) {
      $('#' + playerName).replaceWith($('<h2>').text(playerName + " " +name));
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
          createGameBoardUI(j, i);
        }
      }
      return gameBoardArr;
    }



    function createGameBoardUI(x, y) {


    }



    function setUIForGame() {
      var gameBoard = createGameBoardArr();
      document.getElementById("gameBoard").hidden=false;

      $('#startGame').replaceWith($('<h2>').text('Game Has Started'));
      removeNameSetupUI();
      console.log(gameBoard);
    }

  }

  // main
  document.getElementById("gameBoard").hidden=true;
  comunicator();

});
