<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">In Room {{roomName}}</h1>
      </div>
    </div>
    <table class="table table-hover table-lobby">
      <thead>
        <tr>
          <th scope="col">Player's name</th>
        </tr>
      </thead>
      <tbody v-for="member in members" :key="member">
        <tr>
          <th scope="row">{{member}}</th>
        </tr>
      </tbody>
      <button type="button" class="btn btn-success" @click="startGame">Start game!</button>
      <button type="button" class="btn btn-danger" @click="exitRoom">Exit game!</button>
    </table>
  </div>
</template>

<script>
import socket from '../config/socket';

// const baseUrl = 'http://localhost:3000';
export default {
  data(){
    return {
      roomName: ""
    }
  },
  methods: {
    getPlayer() {
      this.sockets.emit('getPlayer');
    },
    startGame() {
      console.log("gameStart clicked")
      this.$router.push('GameBoard')
    },
    exitRoom() {
      localStorage.removeItem("roomID")
      localStorage.removeItem("isLogin")
      this.$router.push('login')
    }
  },
  computed: {
    members() {
      return (
        this.$store.state.members
      )
    }
  },
  created() {
    this.roomName = localStorage.getItem("roomName")
    this.$store.dispatch("listenMember")
    socket.on(`members-${this.roomName}`, (payload) => {
      console.log(">>", payload)
      this.$store.commit("SET_MEMBERS", payload)
    })
  },
  mounted() {
    this.$store.dispatch("refreshRoom")
    this.$store.dispatch("listenMember")
  }
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
