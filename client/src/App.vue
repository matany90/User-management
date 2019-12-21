<template>
  <v-app :style="{backgroundColor: BACKGROUND}">
    <ToolBar />
    <v-content>
      <UserList />
    </v-content>
  </v-app>
</template>

<script>
 import UserList from './components/UserList.vue';
 import ToolBar from './components/ToolBar.vue';
 import { BACKGROUND } from './utils/colors';

export default {
  data: () => ({ BACKGROUND }),
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


