const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const rooms = []

io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit("rooms", rooms)
  io.on("rooms", function  () {
    console.log("emitroom ")
    io.emit("rooms", rooms)
  })
  // listen from client to create new room
  socket.on("new-room", function (name) {

    const lastRoom = rooms.length + 1
    const room = {
      id: lastRoom,
      name: name,
      members: [],
      chats: []
    }
    rooms.push(room)
    // io emit to client for refresh rooms
    io.emit("rooms", rooms)
  })

  socket.on("join-room", function  (room) {
    // join room
    socket.join(room)

    const indexRoom = rooms.findIndex(function (r) {
      return String(r.id) === String(room)
    })
    io.to(String(room)).emit("chats", rooms[indexRoom])
  })

  socket.on("new-chat", function (payload) {

    console.log(payload)
    const idRoom = payload.room.id
    const indexRoom = rooms.findIndex(function (r) {
      return String(r.id) === String(idRoom)
    })
    rooms[indexRoom].chats.push({
      message: payload.chat.message,
      by: payload.chat.by
    })

    io.to(String(idRoom)).emit("chats", rooms[indexRoom])
  })

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});