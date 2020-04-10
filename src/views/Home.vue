<template>
  <div>
    <h1>Bienvenid@ <span v-text="user.name"></span></h1>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: 'Home',
    computed: {
      ...mapState(['user']),
    }
  }
</script>
