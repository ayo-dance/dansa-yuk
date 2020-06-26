<template>
  <div class="mt-5 row">
    <div class="col-6 card">
    <div class="card-body">
      <router-link  to="/room"> <button type="button" class="btn btn-primary">Back to List Room</button></router-link>
      <h1 class="card-title">Room: {{roomName}}</h1>
      <h2>Player List:</h2>
      <ul v-for="members in rooms" :key="members">
        <li>{{members.members}}</li>
      </ul>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        message: ""
      }
    },
    computed: {
      roomName() {
        return localStorage.roomname
      },
      rooms() {
        return (
          this.$store.state.rooms
        )
      }
    },
    methods :{

    },
    mounted() {
      this.$store.dispatch("joinRoom")
    }
  };
</script>