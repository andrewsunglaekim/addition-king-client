import Vue from 'vue';
import App from './App.vue';
import router from './router';
import routerSync from './routerSync';
import store from './store';

routerSync(store, router);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
