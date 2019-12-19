<template>
   <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
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


export default {
    methods: {
        ...mapActions([
         'toggleDialogVisible'
     ])
    }
}
</script>
