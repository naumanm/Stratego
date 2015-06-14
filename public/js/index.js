$( document ).ready(function() {

  var socket = io();
  var playerName1 = null;
  var playerName2 = null;

  function comunicator() {
    document.getElementById("myButton").addEventListener("click", function( event ) {
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

    function setName(playerName, name) {
      socket.emit(playerName, name);
      document.getElementById(playerName).value = name;
      $('#' + playerName).replaceWith($('<h2>').text(playerName + " " +name));
    }

    function setUIForGame() {
      $('#startGame').replaceWith($('<h2>').text('Game Has Started'));
      document.getElementById("textArea").remove();
      document.getElementById("nameButton").remove();
    }

  }

  // main
  comunicator();

});
