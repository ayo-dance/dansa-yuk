const express = require("express")
var app = require('express')();
const PORT = process.env.PORT || 3000
const server = require('http').Server(app)
var io = require('socket.io')(server)

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

  socket.on('members', (id) => {
    console.log("masuk member")
    let player = rooms[id-1].list_player
    io.emit('members', player)
  })

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
})

server.listen(PORT, (_) => console.log(`listening on PORT ${PORT}`))