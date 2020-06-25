import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: null,
    rooms: [],
  },
  mutations: {
    SET_SOCKET(state, payload) {
      state.socket = payload;
    },
    SET_ROOMS(state, payload) {
      state.rooms = payload;
    },
  },
  actions: {},
  modules: {},
});
