// Stratego, by heyMikeNauman

$( document ).ready(function() {

  var socket = io();
  var playerName1 = null;
  var playerName2 = null;
  var currentPlayer = null;
  var currentTurn = false;
  var gameBoard = [];

  function initialGameBoardSetup() {
    document.getElementById("readyButton").hidden=true;
    document.getElementById("gameBoard").hidden=true;
    document.getElementById("row1").hidden=true;
  }

  function communicator() {
    document.getElementById("nameButton").addEventListener("click", function( event ) {
      setPlayerName();
    }, false);
    document.getElementById("readyButton").addEventListener("click", function( event ) {
      setGameboardReady();
    }, false);
    socket.on('playerName1', function(name){
      setName('playerName1', name);
    });
    socket.on('playerName2', function(name){
      setName('playerName2', name);
    });
    socket.on('gameBoardLocked', function(value) {
      firstTurnContoller();
    });
    socket.on('fromServerToClientTurn', function(object) {
      turnController(object);
    });
  }

  function setPlayerName() {
    var name = document.getElementById("textArea").value;
    currentPlayer = name;
    setupForPlacePieces();
    socket.emit('playerName', name);
  }

  function setupForPlacePieces() {
    gameBoard = createGameBoardArr();
    document.getElementById("textArea").remove();
    document.getElementById("nameButton").remove();
    document.getElementById("readyButton").hidden=false;
    document.getElementById("gameBoard").hidden=false;
    document.getElementById("row1").hidden=false;
    $('td').addClass('snapable');
    $('#playerName').replaceWith($('<h2 id="playerName">').text(currentPlayer));
    $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Place your pieces'));
  }

  function setGameboardReady() {
    document.getElementById("readyButton").remove();
    document.getElementById("gameBoard").hidden=false;
    document.getElementById("rightMenu").hidden=false;
    $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Board is locked'));
    if (playerName1 === currentPlayer) {
      playerReady('1');
    } else if (playerName2 === currentPlayer) {
      playerReady('2');
    }
  }

  function setName(playerName, name) {
    socket.emit(playerName, name);
    if (playerName === 'playerName1') {
      playerName1 = name;
    } else if (playerName = 'playerName2') {
      playerName2 = name;
    }
  }

  function playerReady(value) {
    var player = 'player' + value + 'Ready';
    var player1GameObj = {}
    socket.emit(player, player1GameObj);
  }

  function firstTurnContoller() {
    document.getElementById("playerName").remove();
    if (currentPlayer === playerName1) {
      currentTurn = true
      $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text(playerName1 + ' your shot!'));
    } else {
      currentTurn = false;
      $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Waiting for ' + playerName1));
    }
  }

  function turnController(object) {
    console.log(object);
    if (currentPlayer === object.player) {
      currentTurn = true;
      $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text(object.player + ' your shot!'));
    } else {
      currentTurn = false;
      $('#gameMessage').replaceWith($('<h2 id="gameMessage">').text('Waiting for ' + object.player));
    }
  }

  function Cell(rank, playerName, pieceValue, x, y) {
    this.x = x;
    this.y = y;
    this.rank = rank;
    this.playerName = playerName
    this.pieceValue = pieceValue;
    return this;
  }

  function createGameBoardArr() {
    var gameBoardArr = [];

    for (var i = 1; i < 11; i++){
      for (var j = 1; j < 11; j++) {
        gameBoardArr.push(new Cell(null, null, null, j, i));
      }
    }
    return gameBoardArr;
  }

  function updateGameObject(turnObj) {
    var testBoard ={};

    testBoard = gameBoard.filter(function(obj) {
        var x = obj.xposition;
        var y = obj.yposition;
        return !(x in gameBoard && y in gameBoard);
    });

    testBoard.push(new Cell(turnObj.rank, turnObj.player, turnObj.pieceValue, turnObj.xposition, turnObj.yposition));

    console.log(turnObj);
    console.log(gameBoard);
    console.log(gameBoard.length);
    console.log(testBoard);
    console.log(testBoard.length);
  }

  function loadListeners() {
    $("td").mouseover(function(event){
      if (currentTurn) {
        $(this).css("background-color", "red");
      }
    });

    $("td").mouseleave(function(event){
      if (currentTurn) {
        $(this).css("background-color", "lightyellow");
      }
    });

    $("td").click(function(event){
      if (currentTurn) {
        var x = event.target.dataset.idx;
        var y = event.target.dataset.idy;
        var pieceValue = event.target.dataset.value;
        shotObj = {player: currentPlayer, idx: x, idy: y, turnValue: pieceValue};
        $(this).css("background-color", "lightyellow");
        socket.emit('fromClientToServerTurn', shotObj);
      }
    });

    $( ".gamePiece" ).draggable({
      snap: ".snapable",
      snapMode: "inner",
      containment: "#gameBoard"
    });

    $( "td" ).droppable({
      drop: function( event, ui ) {
        var pieceDropObj = {
          player: currentPlayer,
          rank: ui.draggable[0].dataset.rank,
          xposition: event.target.dataset.idx,
          yposition: event.target.dataset.idy,
          pieceValue: ui.draggable[0].dataset.piecevalue
        }
        socket.emit('gamePiecePlaced', pieceDropObj);
        updateGameObject(pieceDropObj);
      }
    });
  }

  // main

  initialGameBoardSetup();
  communicator();
  loadListeners();

});
