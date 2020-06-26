var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

const cors = require('cors');
app.use(cors());

const maxPlayer = 2;
const players = [];
let playersReady = [];
let score = [];
let winner = { name: 'No one', score: 0 };

io.on('connection', (socket) => {
  console.log('New connection is establised');
  socket.on('player-login', (player) => {
    console.log(`${player.username} has logged in`);
    players.push(player.username);
    if (players.length >= maxPlayer) socket.broadcast.emit('game-standby');
  })

  socket.on('player-ready', (player) => {
    console.log(`${player.username} has ready.`);
    playersReady.push(player.username);
    if (playersReady.length >= maxPlayer) socket.broadcast.emit('game-started');
  })
  
  socket.on('send-score', (player) => {
    score.push(player);
    if (score.length >= maxPlayer) {
      for (const player of score) {
        if (player.score >= winner.score) winner = player;
  
        // Game selesai
        // socket.broadcast.emit('send-score', score);
      }
      socket.broadcast.emit('game-winner', winner);
      playersReady = [];
      score = [];
      winner.score = 0;
      winner.name = 'No one'
    }
  })

})

http.listen(3000, () => {
  console.log('listening on *:3000');
});
