<template>
  <v-app :style="{backgroundColor: '#e0f2f1'}">
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
    ToolBar,
    UserList
  },
};
</script>

<style>
  * {
  font-family: 'Montserrat', sans-serif;
}
</style>


