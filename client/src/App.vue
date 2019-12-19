<template>
  <v-app>
    <ToolBar />
    <v-content>
      <UserList />
    </v-content>
  </v-app>
</template>

<script>
 import UserList from './components/UserList.vue';
 import ToolBar from './components/ToolBar.vue';

export default {
  components: {
    UserList,
    ToolBar
  },
};
</script>
