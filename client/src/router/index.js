import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Lobby from '../views/Lobby.vue';
// import WaitingGame from '@/views/WaitingGame.vue';
import GameBoard from '@/views/GameBoard.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
  },
  // {
  //   path: '/wait',
  //   name: 'WaitingGame',
  //   component: WaitingGame,
  // },
  {
    path: '/gameboard',
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