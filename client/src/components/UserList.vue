<template>
<div class="container" >
  <v-simple-table class="table">
    <template v-slot:default>
      <thead>
        <tr class="container-header" >
          <th class="text-center header-text white--text">Name</th>
          <th class="text-center header-text white--text">Email</th>
          <th class="text-center header-text white--text">Phone</th>
          <th class="text-center header-text editRemove white--text">Edit / Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td class="text-center content-text">{{ user.name }}</td>
          <td class="text-center content-text">{{ user.email }}</td>
          <td class="text-center content-text">{{ user.phone }}</td>
          <td class="text-center icons-container">
            <v-icon class="edit-icon" @click="toggleDialogVisible(user)">
              mdi-pencil
            </v-icon>
            <v-icon class="delete-icon" @click="deleteUser(user)"
            >mdi-delete
            </v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <FormDialog />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FormDialog from './FormDialog.vue';

export default {
    created() {
      /* fetch users from API */
        this.fetchUsers()
    },
    components: {
      FormDialog
    },
    //getters
    computed: {
      users: {
        get() {
          return this.$store.state.users;
        }
      }
    },
    //actions
    methods: {
        ...mapActions([
         'fetchUsers',
         'deleteUser',
         'toggleDialogVisible'
     ]),
    }
}
</script>

<style scoped>
.container {
  padding-left: 150px;
  padding-right: 150px;
  margin-top: 20px;
}
.table {
   border-radius: 30px;
}
.container-header {
  background-color: #00897b;
}
.header-text {
  font-size: 20px;
  color: 'red';
}
.editRemove {
width: 200px
}
.edit-icon {
  margin-right: 5px
}
.delete-icon {
  margin-left: 5px
}
.content-text {
  font-size: 16px;
}
</style>


