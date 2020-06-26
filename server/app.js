const express = require("express")
var app = require('express')();
const PORT = process.env.PORT || 3000
const server = require('http').Server(app)
var io = require('socket.io')(server)

const maxPlayer = 2;
const players = [];
let playersReady = [];
let score = [];
let winner = { name: 'No one', score: 0 };
server.listen(PORT, (_) => console.log(`listening on PORT ${PORT}`))

const cors = require('cors');
app.use(cors());

let rooms = [{
    id: 1,
    name: 'alpha',
    list_player: [],
    admin: 'admin',
  },
  {
    id: 2,
    name: 'beta',
    list_player: [],
    admin: 'admin',
  }
]

io.on("connection", (socket) => {
  console.log("userconnected")
  socket.on('rooms', () => {
    io.emit('rooms', rooms)
  })
  // socket.emit('get-rooms', rooms)

  // socket.on('members', (id) => {
  //   console.log("masuk member")
  //   let player = rooms[id-1].list_player
  //   io.emit('members', player)
  // })

  socket.on('joinRoom', (payload) => {
    console.log("masuk join room")

    const {id, name} = payload
    const room = rooms[id-1].name
    console.log(room)

    socket.join(room, () => {
      console.log(socket.rooms)
      rooms[id - 1].list_player.push(name)
      let player1 = rooms[id-1].list_player
      io.sockets.in(room).emit(`members-${room}`, player1)
    })
    // io.emit('members', player1)
    // io.emit('rooms', rooms[id - 1])
  })

  socket.on('player-login', (payload) => {
    let {username, roomname} = payload
    console.log(`${username} has logged in`);
    players.push(username);
    console.log(players.length)
    if (players.length >= maxPlayer) {
      io.sockets.in(roomname).emit(`game-standby-${roomname}`) 
      // socket.emit('game-standby');
    }
  })

  socket.on('player-ready', (player) => {
    console.log(`${player.username} has ready.`);
    playersReady.push(player.username);
    if (playersReady.length >= maxPlayer) {
      // io.sockets.in(room).emit(`members-${room}`)
      socket.emit('game-started');
    }
    
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


// io.on('connection', (socket) => {
//   console.log('New connection is establised');
//   socket.on('player-login', (player) => {
//     console.log(`${player.username} has logged in`);
//     players.push(player.username);
//     if (players.length >= maxPlayer) socket.broadcast.emit('game-standby');
//   })

//   socket.on('player-ready', (player) => {
//     console.log(`${player.username} has ready.`);
//     playersReady.push(player.username);
//     if (playersReady.length >= maxPlayer) socket.broadcast.emit('game-started');
//   })
  
//   socket.on('send-score', (player) => {
//     score.push(player);
//     if (score.length >= maxPlayer) {
//       for (const player of score) {
//         if (player.score >= winner.score) winner = player;
  
//         // Game selesai
//         // socket.broadcast.emit('send-score', score);
//       }
//       socket.broadcast.emit('game-winner', winner);
//       playersReady = [];
//       score = [];
//       winner.score = 0;
//       winner.name = 'No one'
//     }
//   })

// })

// http.listen(3000, () => {
//   console.log('listening on *:3000');
// });
