<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">In Room 1</h1>
      </div>
    </div>
    <table class="table table-hover table-lobby">
      <thead>
        <tr>
          <th scope="col">Player's name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
        </tr>
      </tbody>
      <button type="button" class="btn btn-success">Start game!</button>
      <button type="button" class="btn btn-danger">Exit game!</button>
    </table>
  </div>
</template>

<script>
import io from 'socket.io-client';

const baseUrl = 'http://localhost:3000';
export default {
  methods: {
    getrooms() {
      this.sockets.emit('get-rooms');
    },
  },
  computed: {
    sockets() {
      return this.$store.state.socket;
    },
    rooms() {
      return this.$store.state.rooms;
    },
  },
  created() {
    const socket = io(baseUrl);
    this.$store.commit('SET_SOCKET', socket);
    this.sockets.on('get-rooms', (rooms) => {
      this.$store.commit('SET_ROOMS', rooms);
    });
    this.getrooms();
  },
};
</script>

<style>
.table-lobby {
  margin: 0 auto;
  width: 18rem;
  padding-top: 3%;
}
.jumbotron {
  background-color: #baf1a1;
}
</style>
