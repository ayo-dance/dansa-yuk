<template>
  <div>
    <h3>Username</h3>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Your Username" aria-label="Recipient's username" aria-describedby="basic-addon2"
      id="username" v-model="username">
      <div class="input-group-append">
        <button type="button" class="btn btn-primary" @click="login" >Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      username: ""
    }
  },
  methods: {
    login() {
      localStorage.setItem("isLogin", this.username)
      this.$store.commit("SET_ISLOGIN", this.username);
      this.$router.push("room");
    }
  }
}
</script>