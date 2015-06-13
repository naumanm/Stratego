$( document ).ready(function() {

  var socket = io();

  function initialize() {
    document.getElementById("myButton").addEventListener("click", function( event ) {
      event.target.innerHTML = "click count: " + event.detail;
      socket.emit('connectToGame',  "Hi Mike");
    }, false);
  }

  initialize();
  console.log( "ready!" );

});
