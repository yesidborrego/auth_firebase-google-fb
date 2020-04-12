<template>
  <v-row justify="center">
    <v-col sm="6">
      <v-card class="text-sm-center">
        <v-card-text>
          <v-avatar size="52" class="mb-2">
            <v-img :src="user.photo"></v-img>
          </v-avatar>
        </v-card-text>
        <v-card-text>
          <h3 v-text="user.name"></h3>
        </v-card-text>
        <v-card-text>
          <input 
            type="file" 
            class="d-none" 
            ref="inputSearch" 
            @change="searchImage($event)"
          >
          <v-btn 
            class="primary mr-3" 
            @click="$refs.inputSearch.click()"
          >
            Search image
          </v-btn>
          <v-btn 
            class="secondary" 
            :disabled="this.file === null"
            @click="uploadImage"
            :loading="loading"
          >
            Upload image
          </v-btn>
        </v-card-text>

        <v-card-text v-if="msg.error">
          <h3 class="mb-2 red--text" v-text="this.msg.error"></h3>
        </v-card-text>

        <v-card-text v-if="file">
          <h3 class="mb-2" v-text="this.file.name"></h3>
          <v-img :src="tempURLImage"></v-img>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapState } from "vuex";
  import { firebase, storage, dbFirebase } from "@/firebase";
  export default {
    name: 'Admin',
    data() {
      return {
        file: null,
        tempURLImage: '',
        loading: false,
        msg: {
          error: null,
          success: null,
        }
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods:{
      searchImage(e) {
        console.log('e.target.files[0].type:', e.target.files[0].type);
        if(e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpeg'
          || e.target.files[0].type == 'image/png') {
            this.file = e.target.files[0];
            this.msg.error = null;
          } else {
            this.file = null;
            this.msg.error = 'File invalid'
            return;
          }
        let reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = e => {
          this.tempURLImage = e.target.result;
        }
      },
      async uploadImage() {
        try {
          this.loading = true;
          // Crea o busca la carpeta llamada con el 'email' del usuario y dentro guarda la foto
          let imageRef = storage.ref().child(this.user.email).child('foto_perfil');
          const res = await imageRef.put(this.file);
          // Obtiene la ruta de la imagen que se acaba de subir
          const getURLImage = await imageRef.getDownloadURL();
          // Actualiza la foto de perfil en la Store
          this.user.photo = getURLImage;
          // Actualiza el campo 'photo' en la Firebase database
          await dbFirebase.collection('users').doc(this.user.uid).update({
            photo: getURLImage
          });
        } catch (error) {
          console.log('error:', error);
        } finally {
          this.loading = false;
        }

      }
    }
  }
</script>