import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
// Firebase
import { auth } from "@/firebase.js";
// Scroll in chat
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.config.productionTip = false

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    let payload = { 
      name  : user.displayName,
      email : user.email,
      photo : user.photoURL,
      uid   : user.uid,
    }
    store.dispatch('setUserData', payload)
  }
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
});

