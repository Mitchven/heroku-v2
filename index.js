var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('login', function(username){
    io.emit('login', username)
  })

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
    console.log('a user connected ' + socket.client);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', { username: socket.username })
    })
});


http.listen(port, function () {
  console.log('listening on *:' + port);
});
