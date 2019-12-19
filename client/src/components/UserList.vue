<template>
<!-- <div>
    <ul>
        <li v-for="(user, index) in users" v-bind:key="index">
            {{user}}
        </li>
    </ul>
        <button @click="addUser('shiri')">Button</button>
        <a href="/api/users">test</a>
</div> -->
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    created() {
        this.fetchUsers()
    },
    computed: {
        ...mapGetters([
        'users'
     ])
    },
    methods: {
        ...mapActions([
         'addUser',
         'fetchUsers'
     ])
    }
}
</script>

