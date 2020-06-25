var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

const cors = require('cors');
app.use(cors());

http.listen(3000, () => {
  console.log('listening on *:3000');
});