<template>
   <v-app-bar
      app
      color="#4db6ac"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('../assets/logo.png')"
          transition="scale-transition"
          width="60"
        />
        <h2>Matan's User list</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        target="_blank"
        text
        @click="toggleDialogVisible()"
      >
        <span class="mr-2">Add User</span>
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';

//toggleDialogVisible open/close form
export default {
    methods: {
        ...mapActions([
         'toggleDialogVisible'
     ])
    }
}
</script>

<style scoped>

</style>

