$( document ).ready(function() {

  var socket = io();
  var playerName1 = null;
  var playerName2 = null;

  function comunicator() {
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
      console.log('test1');

      if (value === 'locked') {
        $('#playerName1').replaceWith($('<h2>').text("Game is locked"));
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

    function setUIForGame() {
      $('#startGame').replaceWith($('<h2>').text('Game Has Started'));
      removeNameSetupUI();
    }
  }

  // main
  comunicator();

});
