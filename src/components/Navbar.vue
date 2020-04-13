<template>
  <nav>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link :to="{name: 'Home'}">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="logout" small>
        <span class="mr-2">Log Out</span>
        <v-icon small>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" class="indigo" app>
      <!-- <v-list-item class="my-3">
        <v-list-item-avatar>
          <v-img :src="user.photo"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text"><span v-text="user.name"></span></v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-row class="d-flex flex-column mt-5" align="center">
        <v-flex>
          <v-avatar size="52" class="mb-2">
            <v-img :src="user.photo"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="white--text" v-text="user.name"></p>
        </v-flex>
      </v-row>


      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text"><span v-text="item.title"></span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    name: 'Navbar',
    data() {
      return {
        drawer: false,
        items: [
          { title: 'Dashboard', icon: 'fas fa-tachometer-alt', to: {name: 'Home'} },
          { title: 'Chat', icon: 'fas fa-comments', to: {name: 'Chat'} },
          { title: 'Account', icon: 'fas fa-user', to: {name: 'Login'} },
          { title: 'Admin', icon: 'fas fa-users-cog', to: {name: 'Admin'} },
        ],      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      ...mapActions(['logout'])
    },
  }
</script>