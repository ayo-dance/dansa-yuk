<template>
  <div>
    <body>
      <div id="icon-arrow">
        <div class="icon-img">
          <i class="fa fa-arrow-right arrow1" aria-hidden="true"></i>
          <i class="fa fa-arrow-up arrow2" aria-hidden="true"></i>
          <i class="fa fa-arrow-left arrow1" aria-hidden="true"></i>
          <i class="fa fa-arrow-down arrow2" aria-hidden="true"></i>
        </div>
      </div>
      <div class="game-container">
        <i class="fa fa-gamepad title" aria-hidden="true">Ayo Dance</i>
        <form>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your name"
              v-model="username"
            />
          </div>
          
        </form>
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Create room"
              v-model="roomName"
            />
          </div>
          <button type="submit" class="btn btn-primary" @click="addRoom">Create Room</button>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Room's list</th>
              </tr>
            </thead>
            <tbody v-for="(room, index) in rooms" :key="index">
              <tr>
                <th scope="row">{{room.name}}</th> <button type="submit" class="btn btn-primary" @click="login(room.id, room.name)">Enter Room</button>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    rooms() {
      return (
        this.$store.state.rooms
      )
    }
  },
  data(){
    return {
      username: "",
      roomName: ""
    }
  },
  methods: {
    login(id, roomname) {
      console.log(id, this.username)
      localStorage.setItem("isLogin", this.username);
      localStorage.setItem("roomID", id);
      localStorage.setItem("roomName", roomname);
      this.$store.commit("SET_ISLOGIN", true);
      this.$store.dispatch("joinRoom")
      this.$router.push("lobby");
    },
    addRoom() {
      this.$store.dispatch("newRoom", this.roomName)
    }
  },
  mounted() {
    this.$store.dispatch("refreshRoom")
    this.$store.dispatch("listenRoom")
  }
}
</script>

<style>
.title {
  margin-top: 5vh;
  font-size: 40px;
  cursor: default;
  /* color: #36a2eb; */
  color: #ff6384;
}
.arrow1 {
  font-size: 100px;
  cursor: default;
  color: #36a2eb;
  /* color: #ff6384; */
}
.arrow2 {
  font-size: 100px;
  cursor: default;
  /* color: #36a2eb; */
  color: #ff6384;
}
.game-container {
  width: 100vw;
  height: 100vh;
  text-align: center;
  padding: 10px;
}
body {
  font-family: 'Roboto Mono', monospace;
  background-color: #edf492;
  color: #333;
}
#icon-arrow {
  width: 100%;
  height: 100px;
  margin: 0 auto;
}
form {
  margin: 0 auto;
  width: 18rem;
  padding-top: 3%;
}
.icon-img {
  width: 50%;
  text-align: center;
  margin: 0 auto;
}
.table {
  margin-top: 20px;
}
</style>