<template>
  <v-card tile height="100%" color="blue">
    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          :class="`elevation-${hover ? 24 : 6}`"
          class="mx-auto pa-6 transition-swing"
          width="250px"
          height="250px"
        >
          <v-card-title>
            <h1>{{ moveDirection }}</h1>
          </v-card-title>

          <v-card-subtitle>
            <h2 :class="message == 'Nice!' ? 'correct' : 'wrong'">
              {{ message }}
            </h2>
            <h3>Remaining time: {{ timer }}</h3>
            <h3 class="correct">Correct Move: {{ correct }}</h3>
            <h3 class="wrong">Wrong Move: {{ incorrect }}</h3>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              v-if="gameStatus == 'standby'"
              color="primary"
              @click="gameStart()"
            >
              Start
            </v-btn>
            <v-btn
              v-else-if="gameStatus == 'started'"
              color="warning"
              @click="giveUp()"
            >
              Give Up
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      moveKeyCode: 0,
      moveDirection: '',
      gameStatus: 'standby',
      timer: '',
      timeInterval: '',
      correct: 0,
      incorrect: 0,
      message: '',
    };
  },
  methods: {
    gameStart() {
      this.correct = 0;
      this.incorrect = 0;
      this.timer = 10; // Hardcore!
      this.timeInterval = setInterval(() => {
        this.timer -= 1;
      }, 1000);
      this.gameStatus = 'started';
    },
    giveUp() {
      this.timer = 0;
      clearInterval(this.timeInterval);
      this.gameStatus = 'standby';
    },
    randomMove() {
      this.moveKeyCode = Math.floor(Math.random() * 4) + 37;
      if (this.moveKeyCode === 37) this.moveDirection = '←';
      else if (this.moveKeyCode === 38) this.moveDirection = '↑';
      else if (this.moveKeyCode === 39) this.moveDirection = '→';
      else if (this.moveKeyCode === 40) this.moveDirection = '↓';
    },
    keyDownHandler(event) {
      if (this.gameStatus === 'started') {
        if (
          event.keyCode === 37 ||
          event.keyCode === 38 ||
          event.keyCode === 39 ||
          event.keyCode === 40
        ) {
          if (event.keyCode === this.moveKeyCode) {
            this.message = 'Nice!';
            this.correct += 1;
            this.randomMove();
          } else {
            this.message = 'Oops!';
            this.incorrect += 1;
          }
        }
      }
    },
  },
  watch: {
    timer(val) {
      if (val === 0) {
        this.gameStatus = 'standby';
        clearInterval(this.timeInterval);
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.keyDownHandler, false);
    this.randomMove();
  },
};
</script>

<style scoped>
.wrong {
  color: red;
}
.correct {
  color: blue;
}
</style>
