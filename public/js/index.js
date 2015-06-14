$( document ).ready(function() {

  var socket = io();
  var playerName1 = null;
  var playerName2 = null;

  function comunicator() {
    document.getElementById("myButton").addEventListener("click", function( event ) {
      var name = document.getElementById("myArea").value;
      socket.emit('playerName', name);
    }, false);

    socket.on('playerName1', function(name){
      playerName1 = name;
      $('#playerName1').replaceWith($('<h2>').text('playerName1 ' + playerName1));
    });

    socket.on('playerName2', function(name){
      playerName2 = name;
      $('#playerName2').replaceWith($('<h2>').text('playerName2 ' + playerName2));
    });

  }

  function checkPlayers() {
    if (!playerName1 && !playerName2) {
      return true;
    }
  }

  // main
  comunicator();

});
