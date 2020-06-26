<template>
  <v-card tile height="100%" color="blue">
    <v-card-title>
      <h1>Welcome, {{ this.$store.state.username }}</h1>
    </v-card-title>
    <v-card-subtitle>
      <h2>Please wait</h2>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default {
  data: () => ({
    dialog: false,
  }),
  created() {
    socket.on('game-standby', () => {
      this.$router.push('game');
    });
  },
};
</script>

<style></style>
