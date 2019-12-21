import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
/* Entry point */
new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
