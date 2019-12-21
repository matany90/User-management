<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogVisible" persistent max-width="600px">
      <v-card class="container" :style="{backgroundColor: BACKGROUND}">
        <v-card-title class="justify-center">
          <span :style="{color: PRIMARY, fontSize: '30px', fontWeight: 800}">{{loadTitle()}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Name*" required v-model="name" :color="PRIMARY"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Phone*" required v-model="phone" :color="PRIMARY"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required v-model="email" :color="PRIMARY"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="PRIMARY" text @click="toggleDialogVisible()">Cancel</v-btn>
          <v-btn :color="PRIMARY" text @click="submitForm()" :disabled="isButtonDisable()">Save User</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import { BACKGROUND, PRIMARY } from '../utils/colors'
  export default {
    data: () => ({ BACKGROUND, PRIMARY }),
    methods: {
    ...mapActions([
        'toggleDialogVisible',
        'addUser',
        'updateUser'
     ]),
     //on Add/Edit submit form
      submitForm() {
        const { name, phone, email, id } = this.$store.state;
        const user = { name, phone, email, id }
        user.id === '' ? this.addUser(user) : this.updateUser(user);
      },
      //load title depends on id existing
      loadTitle() {
        const { id } = this.$store.state
        let title;
         id === '' ? title = 'Add User' :  title = 'Update User';
         return title;
      },
      //check if submit form button need to be disable/enable
      isButtonDisable() {
        const { name, phone, email } = this.$store.state;
        return ( email === '' || phone === '' || name === '' )
      }
    },
    //getters and setters
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
    id: {
        set(id) {
            this.$store.commit('setId', id)
        },
        get() {
            return this.$store.state.id;
        }
     },
    },
  }
</script>

<style scoped>

</style>
