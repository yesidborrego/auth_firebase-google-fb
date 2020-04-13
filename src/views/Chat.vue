<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <h3>
            Welcome<span v-text="user.name"></span>
          </h3>
        </v-card-text>

        <v-card-text class="chatBox" v-chat-scroll>
          <div 
            :class="msg.name === user.name ? 'text-sm-left' : 'text-sm-right'"
            v-for="(msg, index) in arrayMsgs" :key="index"  
          >
          <p>{{ msg.name }}</p>
          <p>{{ user.name }}</p>
            <v-chip>
              <v-avatar class="mr-2">
                <img :src="msg.photo" alt="profile">
              </v-avatar>
              <span v-text="msg.msg"></span>
            </v-chip>
            <p class="caption mr-2" v-text="msg.date"></p>
          </div>
        </v-card-text>

        <v-card-text>
          <v-form @submit.prevent="sendMsg" v-model="valid">
            <v-text-field
              v-model="msgText"
              :rules="msgTextRules"
              :counter="100"
              label="Write your message here..."
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { dbFirebase } from "@/firebase";
import moment from "moment";
moment.locale('es');
export default {
  name: "Chat",
  data() {
    return {
      valid: false,
      msgText: '',
      msgTextRules: [
        v => !!v || 'You must write a message',
        v => v.length <= 100 || 'The text must be less than 100 characters',
      ],
      arrayMsgs: [],
    }
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    let ref = dbFirebase.collection('chats').orderBy('date', 'desc');
    ref.onSnapshot( querySnapshot => {
      this.arrayMsgs = [];
      querySnapshot.forEach( doc => {
        this.arrayMsgs.unshift({
          name: doc.data().name,
          msg: doc.data().msg,
          photo: doc.data().photo,
          date: moment(doc.data().date).format('lll'),
        });
      });
    });
  },
  methods: {
    sendMsg() {
      if(this.valid) {
        dbFirebase.collection('chats').add({
          msg: this.msgText,
          name: this.user.name,
          photo: this.user.photo,
          date: Date.now()
        })
          .catch( error => console.log('error:', error));
        console.log(`You sent your message: ${this.msgText}`);
        this.msgText = '';
      }
    }
  }
};
</script>

<style scoped>
  .chatBox {
    height: 50vh;
    overflow: auto;
  }
</style>