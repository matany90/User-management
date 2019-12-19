<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogVisible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required v-model="name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Phone*"
                  required
                  v-model="phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required v-model="email"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="toggleDialogVisible()">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addUser({name, phone, email})" :disabled="email === '' || phone === '' || name === '' ">Save User</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, /*mapGetters,*/ /*mapMutations*/ } from 'vuex';
  export default {
    methods: {
    ...mapActions([
        'toggleDialogVisible',
        'addUser'
     ]),

    },
    computed: {
     isDialogVisible: {
       get() {
          return this.$store.state.isDialogVisible;
       }
     }, 
     name: {
        set(name) {
            this.$store.commit('setName', name)
        },
        get() {
            return this.$store.state.name;
        }
     },
     email: {
        set(email) {
            this.$store.commit('setEmail', email)
         },
        get() {
            return this.$store.state.email;
        }
     },
    phone: {
        set(phone) {
            this.$store.commit('setPhone', phone)
        },
        get() {
            return this.$store.state.phone;
        }
     },

    },
  }
</script>