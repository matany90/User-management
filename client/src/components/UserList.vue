<template>
<div class="container" >
    <loading :active.sync="isLoading" 
      :is-full-page="false"></loading>
  <v-simple-table class="table">
    <template v-slot:default>
      <thead>
        <tr :style="{backgroundColor: SECONDARY}" >
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
import { mapActions, mapGetters } from 'vuex';
import FormDialog from './FormDialog.vue';
import { SECONDARY } from '../utils/colors';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    data: () => ({ SECONDARY }),
    created() {
      /* fetch users from API */
        this.fetchUsers()
    },
    components: {
      FormDialog,
      Loading
    },
    //getters
    computed: {
      ...mapGetters([
        'users',
        'isLoading'
      ])
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
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 20px;
}
.table {
   border-radius: 30px;
    animation-name: moveInBottom;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    backface-visibility: hidden;
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
@keyframes moveInBottom {
    0% {
        opacity: 0;
        transform: translateY(30px)
    }
    100% {
        opacity: 1;
        transform: translate(0)
    }
}
</style>


