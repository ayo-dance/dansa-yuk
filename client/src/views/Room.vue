<template>
  <div class="mt-4">
    <h1>List Room</h1>
    <button class="btn btn-info mb-3" @click="addRoom">Add Room</button>
    <button class="btn btn-danger mb-3 ml-3" @click="leave">Log Out</button>
    <div class="row">
      <div v-for="room in rooms" :key="room" class="col-3 card m-2">
        <div class="card-body">
          <h5 class="card-title">{{room.name}}</h5>
          <button 
            class="btn btn-primary mt-2"
            @click="joinRoom(room)"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 name: "Room",
 computed: {
  rooms() {
    return (
      this.$store.state.rooms
    )
  }
 },
 methods: {
  joinRoom(room) {
    localStorage.setItem("roomid", room.id)
    localStorage.setItem("roomname", room.name)
    this.$router.push("/dashboard")
  },
  addRoom() {
      let room = prompt("Please enter name room:", " ");
      if(!!room) {
        this.$store.dispatch("newRoom", room, localStorage.getItem("isLogin"))
      }
    },
  refresh() {
    this.$store.dispatch("refreshRoom")
  },
  leave() {
    localStorage.removeItem("isLogin")
    this.$router.push("/")
  }
  },
  mounted() {
    this.$store.dispatch("refreshRoom")
    this.$store.dispatch("listenRoom")
  }
};
</script>