// Stratego, mikeNauman

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set("view engine", "ejs");

// location for static files
app.use(express.static(__dirname + '/public'));

console.log(__dirname + '/public');

app.get('/', function(req, res){
  res.render('index.ejs');
});

// communication
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('connectToGame', function(msg){
    console.log(msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
