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
  socket.on('get-room', () => {
    io.emit('get-room', rooms)
  })
  // socket.emit('get-rooms', rooms)
})

server.listen(PORT, (_) => console.log(`listening on PORT ${PORT}`))