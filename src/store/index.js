import Vue from 'vue'
import Vuex from 'vuex'
import { auth, dbFirebase } from "@/firebase";
import router from "@/router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
  },
  mutations: {
    setUserData(state, payload) {
      (payload === null) ? state.user = '' : state.user = payload;
    }
  },
  actions: {
    async setUserData({commit}, payload) {
      try {
        let existUser = await dbFirebase.collection('users').doc(payload.uid).get();
        if(existUser.exists){
          payload.photo = existUser.data().photo;
        } else {
          // Save in db
          await dbFirebase.collection('users').doc(payload.uid).set(payload);        
        }
      } catch (error) {
        console.log('error:', error);
      }
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
