$( document ).ready(function() {

  console.log( "ready!" );

  var socket = io();

  document.getElementById("myButton").addEventListener("click", function( event ) {
    console.log("button click");
    event.target.innerHTML = "click count: " + event.detail;
    socket.emit('connectToGame',  "Hi Mike");
  }, false);

});
