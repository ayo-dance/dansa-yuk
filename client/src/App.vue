<template>
  <v-app>
    <GameBoard />
  </v-app>
</template>

<script>
import GameBoard from '@/views/GameBoard.vue';

export default {
  name: 'App',

  components: {
    GameBoard,
  },

  data: () => ({
    //
  }),
};
</script>
