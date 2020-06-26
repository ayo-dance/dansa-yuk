import Vue from 'vue';
import Vuex from 'vuex';
import socket from '../config/socket';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: null,
    isLogin: false,
    rooms: [],
    members: []
  },
  mutations: {
    SET_ISLOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_SOCKET(state, payload) {
      state.socket = payload;
    },
    SET_ROOMS(state, payload) {
      state.rooms = payload;
    },
    SET_MEMBERS(state, payload) {
      console.log("masuk SetMember Store", payload)
      state.members = payload;
    }
  },
  actions: {
    listenRoom({ commit }) {
      socket.on("rooms", function  (payload)  {
        commit("SET_ROOMS", payload)
      })
    },
    listenMember({ commit }) {
      console.log("listenMember")
      socket.emit("members", localStorage.getItem("roomID"), function  (payload) {
        console.log(payload)
        socket.on("members", function(payload){
          commit("SET_MEMBERS", payload)
        })
      })
    },
    refreshRoom() {
      socket.emit("rooms")
    },
    joinRoom() {
      console.log("masuk Join Room Store")
      let payload = { 
        id: localStorage.getItem("roomID"),
        name: localStorage.getItem("isLogin")
      }
      socket.emit("joinRoom", payload )
      
    }
  },
  modules: {},
});
