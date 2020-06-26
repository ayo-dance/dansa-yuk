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
          <v-card-subtitle v-if="gameStatus == 'started'">
            <h1 class="bigger">{{ moveDirection }}</h1>
            <h2>{{ username }}</h2>
            <h2 :class="message == 'Nice!' ? 'correct' : 'wrong'">
              {{ message }}
            </h2>
            <h3>Remaining time: {{ timer }}</h3>
            <h3 class="correct">Correct Move: {{ correct }}</h3>
            <h3 class="wrong">Wrong Move: {{ incorrect }}</h3>
          </v-card-subtitle>

          <v-card-subtitle v-if="gameStatus == 'finish'">
            <h3>
              The winner is: {{ winner.name }} with {{ winner.score }} score
            </h3>
          </v-card-subtitle>

          <v-card-subtitle v-if="gameStatus == 'countdown'">
            <h3>Game started in: {{ countDown }}</h3>
          </v-card-subtitle>

          <v-card-subtitle v-if="gameStatus == 'waiting'">
            <h3>Waiting other player</h3>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              v-if="gameStatus == 'standby'"
              color="primary"
              @click="playerReady()"
            >
              Ready
            </v-btn>
            <v-btn
              v-if="gameStatus == 'finish'"
              color="primary"
              @click="replay()"
            >
              Replay
            </v-btn>
            <!-- <v-btn
              v-else-if="gameStatus == 'started'"
              color="warning"
              @click="giveUp()"
            >
              Give Up
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
  </v-card>
</template>

<script>
import io from 'socket.io-client';
import { mapState } from 'vuex';

const socket = io('http://localhost:3000');
export default {
  data() {
    return {
      moveKeyCode: 0,
      moveDirection: '',
      gameStatus: 'standby',
      timer: '',
      countDown: '',
      timeInterval: '',
      correct: 0,
      incorrect: 0,
      message: '',
      winner: '',
    };
  },
  methods: {
    playerReady() {
      this.$store.dispatch('playerReady');
      this.gameStatus = 'waiting';
    },
    gameStart() {
      this.correct = 0;
      this.incorrect = 0;
      this.timer = 10; // Hardcore!
      this.timeInterval = setInterval(() => {
        this.timer -= 1;
      }, 1000);
      this.gameStatus = 'started';
    },
    replay() {
      this.gameStatus = 'standby';
      this.message = '';
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
        this.gameStatus = 'finish';
        clearInterval(this.timeInterval);
        this.$store.dispatch('sendScore', this.correct - this.incorrect);
      }
    },
    countDown(val) {
      if (val === 0) {
        clearInterval(this.timeInterval);
        this.gameStart();
      }
    },
  },
  created() {
    socket.on('game-started', () => {
      this.gameStatus = 'countdown';
      this.countDown = 5;
      this.timeInterval = setInterval(() => {
        this.countDown -= 1;
      }, 1000);
    });
    socket.on('game-winner', (winner) => {
      this.winner = winner;
    });
  },
  mounted() {
    document.addEventListener('keydown', this.keyDownHandler, false);
    this.randomMove();
  },
  computed: mapState(['username']),
};
</script>

<style scoped>
.wrong {
  color: red;
}
.correct {
  color: blue;
}
.bigger {
  font-size: 2em;
}
</style>
