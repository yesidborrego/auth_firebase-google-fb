<template>
  <v-row justify="center" class="mt-3">
    <v-col xs="12" sm="8" md="6" lg="4">
      <v-card>
        <v-card-text 
          :class="['display-1 text-uppercase text-center', signup ? 'purple white--text' : 'blue-grey lighten-5']">
          <span v-text=" signup ? 'Sign Up' : 'Log In'"></span>
        </v-card-text>

      <v-card-text>
        <v-btn block color="error" @click="authGoogle">
          <v-icon left dark>fab fa-google</v-icon>
          Google
        </v-btn>

        <v-btn block color="info" @click="authFacebook">
          <v-icon left dark>fab fa-facebook-f</v-icon>
          Facebook
        </v-btn>
      </v-card-text>

      <v-card-text>
        <v-btn block @click="changeState" :class="signup ? 'purple white--text' : 'blue-grey lighten-5'">
          <span v-text=" signup ? 'Already have an account?, Log In' : 'Don\'t have an account?, Sign up'"></span>
        </v-btn>
      </v-card-text>
      
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { firebase, auth, dbFirebase } from "@/firebase";
  import { mapActions } from "vuex";
  import router from "@/router/index";
  export default {
    name: 'Login',
    data() {
      return {
        signup: false,
      }
    },
    methods: {
      ...mapActions(['setUserData']),
      changeState() {
        this.signup = !this.signup;
      },
      async authGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        this.authUser(provider);
      },
      async authFacebook() {
        let provider = new firebase.auth.FacebookAuthProvider();
        this.authUser(provider);
      },
      async authUser(provider) {
        firebase.auth().languageCode = 'es';
        try {
          let data = await firebase.auth().signInWithPopup(provider);
          // let user = data.user;
          // Contruct users data
          const userData = {
            name  : data.user.displayName,
            email : data.user.email,
            uid   : data.user.uid,
            photo : data.user.photoURL
          }
          // Save in db
          // await dbFirebase.collection('users').doc(userData.uid).set(userData);
          // this.setUserData(userData.user);
          this.setUserData(userData);
          router.push({name: 'Home'});
        } catch (error) {
          console.log('error:', error);
        }
        
      }
    }
  }
</script>
