<template>
  <div>
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <button v-on:click="getWinner">get winner</button>
  <transition name="bounce">
    <p v-if="show">Congrats {{winner}} is the winner!! </p>
  </transition>
  <transition-group name="list" tag="p">
    <span v-for="player in players" v-bind:key="player.id" class="list-item">
      {{ player.name }}
    </span>
  </transition-group>
</div>
</template>

<script>
export default {
    data(){
        return{
            show: false,
            players: [],
            newId: 0,
            winner: '',
        };
    },
    methods: {
    add: function () {
        this.newId++
        let newplayer = {
                    id: this.newId,
                    name: 'player ' + this.newId,
                    score: Math.ceil(Math.random() * 100),
                    }
        let index = 0
        this.players.forEach((el, i) => {
            if(el.score >= newplayer.score){
                return index = i + 1
                }
        });
        console.log(index)
      this.players.splice(index, 0, newplayer)
    },
    remove: function () {
      this.players.pop()
    },
    getWinner: function () {
        // console.log(this.players)
        this.winner = this.players[0].name
        this.show = !this.show
    },
  }
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>