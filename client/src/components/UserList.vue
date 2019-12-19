<template>
<div :style="{marginLeft: '150px', marginRight: '150px'}">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone</th>
          <th :style="{width: '200px'}" class="text-left">Edit / Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <v-icon :style="{marginRight: '5px'}" @click="toggleDialogVisible(user)">
              mdi-pencil
            </v-icon>
            <v-icon :style="{marginLeft: '5px'}" @click="deleteUser(user)"
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

export default {
    created() {
        this.fetchUsers()
    },
    components: {
      FormDialog
    },
    computed: {
        ...mapGetters([
        'users',
     ])
    },
    methods: {
        ...mapActions([
         'fetchUsers',
         'deleteUser',
         'toggleDialogVisible'
     ]),
    }
}
</script>


