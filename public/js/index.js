$( document ).ready(function() {

  var socket = io();

  function comunicator() {
    document.getElementById("myButton").addEventListener("click", function( event ) {
      var message = document.getElementById("myArea").value;
      socket.emit('playerName', message);
    }, false);

    socket.on('playerName', function(msg){
      $('#name').replaceWith($('<h2>').text(msg));
    });

  }

  // main
  comunicator();

});
