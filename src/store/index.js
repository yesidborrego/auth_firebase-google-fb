import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from "@/firebase";
import router from "@/router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUserData(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    setUserData({commit}, payload) {
      commit('setUserData', payload);
    },
    logout({commit}) {
      auth.signOut();
      router.push({name: 'Login'});
      commit('setUserData', null);
    }
  },
  modules: {
  }
})
