import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import GameBoard from '../views/GameBoard.vue';
import Lobby from '../views/Lobby.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/gameboard',
    name: 'GameBoard',
    component: GameBoard,
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;