// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Ajax from './libs/ajax'
import store from './store'

Vue.config.productionTip = false;
Vue.use(Ajax, {
  baseURL: 'http://104.199.142.204:3000'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
