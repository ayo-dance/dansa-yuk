import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
  },
  mutations: {
    INSERT_USERNAME(state, username) {
      state.username = username;
    },
  },
  actions: {
    playerLogin({ commit }, username) {
      commit('INSERT_USERNAME', username);
      socket.emit('player-login', { username });
    },
    playerReady({ state }) {
      socket.emit('player-ready', { username: state.username });
    },
    sendScore({ state }, score) {
      socket.emit('send-score', {
        name: state.username,
        score,
      });
    },
  },
  modules: {},
});
