import Vue from 'vue';
import VueRouter from 'vue-router';
import WaitingGame from '@/views/WaitingGame.vue';
import GameBoard from '@/views/GameBoard.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/wait',
    name: 'WaitingGame',
    component: WaitingGame,
  },
  {
    path: '/game',
    name: 'GameBoard',
    component: GameBoard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
