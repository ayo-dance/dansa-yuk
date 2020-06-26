<template>
  <v-card
    class="d-flex justify-sm-space-around align-center bg-dance"
    tile
    height="100%"
  >
    <!-- One Component -->
    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          :class="`elevation-${hover ? 24 : 6}`"
          class="mx-auto pa-6 transition-swing trans"
          width="500px"
          height="80%"
        >
          <v-card height="25%" class="trans1">
            <h2 v-if="gameStatus != 'finish'" class="ml-4 pt-4">
              Let's dance, {{ username }}!
            </h2>
            <v-card-subtitle
              class="d-flex flex-column align-center justify-center"
              v-if="gameStatus == 'finish'"
            >
              <div v-if="winner.name != username">
                <h1 class="mb-3 mt-5">Sorry, {{ username }} you loose!</h1>
                <h1>Highest score: {{ winner.score }}</h1>
              </div>
              <div v-else>
                <h1 class="mb-3 mt-5">
                  Congratulation {{ winner.name }}, you win!
                </h1>
                <h1>Your score: {{ winner.score }}</h1>
              </div>
            </v-card-subtitle>

            <v-card-subtitle
              class="d-flex justify-space-between"
              v-if="gameStatus == 'started'"
            >
              <div>
                <h2 class="correct">Correct Move: {{ correct }}</h2>
                <h2 class="wrong">Wrong Move: {{ incorrect }}</h2>
              </div>
              <div>
                <h1>{{ timer }}</h1>
              </div>
            </v-card-subtitle>
          </v-card>

          <v-card class="d-flex flex-column align-center trans2" height="45%">
            <h1 v-if="gameStatus == 'started'" class="mt-5 mb-5">
              Follow my step!
            </h1>
            <div v-if="gameStatus == 'started'" class="mb-5">
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
            <v-card-subtitle v-if="gameStatus == 'started'">
              <h2 :class="message == 'Nice move!' ? 'correct' : 'wrong'">
                {{ message }}
              </h2>
            </v-card-subtitle>
          </v-card>

          <v-card
            class="d-flex align-center justify-center trans3"
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
            class="d-flex align-center justify-center trans4"
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
      audio: '',
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
      this.audio.play();
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
            this.message = 'Nice move!';
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
        this.audio.pause();
        this.audio.currentTime = 0;
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
    this.audio = new Audio('../assets/civil-war-drum.mp3');
    this.audio.play();
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
.bg-dance {
  background-size: cover;
  background-position: center;
  background-image: url('../assets/bg.jpg');
}
.trans {
  background-color: rgba(68, 68, 250, 0.39);
}
.trans1 {
  background-color: rgba(255, 241, 118, 0.85);
}
.trans2 {
  background-color: rgba(255, 249, 196, 0.85);
}
.trans3 {
  background-color: rgba(255, 245, 157, 0.85);
}
.trans4 {
  background-color: rgba(255, 241, 118, 0.85);
}
</style>
