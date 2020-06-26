<template>
  <v-card
    class="d-flex justify-sm-space-around align-center"
    tile
    height="100%"
    color="blue"
  >
    <!-- One Component -->
    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          :class="`elevation-${hover ? 24 : 6}`"
          class="mx-auto pa-6 transition-swing"
          width="500px"
          height="80%"
          tile="false"
        >
          <v-card color="yellow lighten-2" height="20%">
            <h2 class="ml-4">Let's dance, {{ username }}!</h2>
            <v-card-subtitle v-if="gameStatus == 'finish'">
              <h3>
                The winner is: {{ winner.name }} with {{ winner.score }} score
              </h3>
            </v-card-subtitle>

            <v-card-subtitle v-if="gameStatus == 'started'">
              <h3>Remaining time: {{ timer }}</h3>
              <h3 class="correct">Correct Move: {{ correct }}</h3>
              <h3 class="wrong">Wrong Move: {{ incorrect }}</h3>
            </v-card-subtitle>
          </v-card>

          <v-card
            class="d-flex flex-column align-center"
            color="yellow lighten-4"
            height="50%"
          >
            <v-card-subtitle v-if="gameStatus == 'started'">
              <h2 :class="message == 'Nice!' ? 'correct' : 'wrong'">
                {{ message }}
              </h2>
            </v-card-subtitle>

            <div v-if="gameStatus == 'started'">
              <i
                v-if="moveKeyCode == 37"
                class="fa fa-arrow-left arrow"
                aria-hidden="true"
              ></i>
              <i
                v-else-if="moveKeyCode == 38"
                class="fa fa-arrow-up arrow"
                aria-hidden="true"
              ></i>
              <i
                v-else-if="moveKeyCode == 39"
                class="fa fa-arrow-right arrow"
                aria-hidden="true"
              ></i>
              <i
                v-if="moveKeyCode == 40"
                class="fa fa-arrow-down arrow"
                aria-hidden="true"
              ></i>
            </div>
          </v-card>

          <v-card
            class="d-flex align-center justify-center"
            color="yellow lighten-3"
            height="20%"
          >
            <div>
              <div class="d-flex justify-center mb-5">
                <v-btn
                  :color="buttonUp"
                  @click="keyDownHandler({ keyCode: 38 })"
                  >↑</v-btn
                >
              </div>
              <div class="d-flex justify-center">
                <v-btn
                  :color="buttonLeft"
                  @click="keyDownHandler({ keyCode: 37 })"
                  >←</v-btn
                >
                <v-btn
                  :color="buttonDown"
                  @click="keyDownHandler({ keyCode: 40 })"
                  class="mx-5"
                  >↓</v-btn
                >
                <v-btn
                  :color="buttonRight"
                  @click="keyDownHandler({ keyCode: 39 })"
                  >→</v-btn
                >
              </div>
            </div>
          </v-card>

          <v-card
            class="d-flex align-center justify-center"
            color="yellow lighten-2"
            height="10%"
          >
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
            </v-card-actions>
          </v-card>
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
      gameStatus: 'standby',
      moveKeyCode: 0,
      // moveDirection: '',
      duration: 20,
      timer: '',
      countDown: '',
      timeInterval: '',
      correct: 0,
      incorrect: 0,
      message: '',
      winner: '',
      buttonLeft: '',
      buttonUp: '',
      buttonRight: '',
      buttonDown: '',
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
      this.timer = this.duration; // Hardcore!
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
      // if (this.moveKeyCode === 37) this.moveDirection = '←';
      // else if (this.moveKeyCode === 38) this.moveDirection = '↑';
      // else if (this.moveKeyCode === 39) this.moveDirection = '→';
      // else if (this.moveKeyCode === 40) this.moveDirection = '↓';
    },
    keyDownHandler(event) {
      if (event.keyCode === 37) {
        this.buttonLeft = 'primary';
        // this.keyUpHandler(event);
      } else if (event.keyCode === 38) {
        this.buttonUp = 'primary';
        // this.keyUpHandler(event);
      } else if (event.keyCode === 39) {
        this.buttonRight = 'primary';
        // this.keyUpHandler(event);
      } else if (event.keyCode === 40) {
        this.buttonDown = 'primary';
        // this.keyUpHandler(event);
      }

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
    keyUpHandler(event) {
      if (event.keyCode === 37) this.buttonLeft = 'normal';
      else if (event.keyCode === 38) this.buttonUp = 'normal';
      else if (event.keyCode === 39) this.buttonRight = 'normal';
      else if (event.keyCode === 40) this.buttonDown = 'normal';
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
    document.addEventListener('keyup', this.keyUpHandler, false);
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
.arrow {
  font-size: 100px;
  cursor: default;
  color: #36a2eb;
}
</style>
