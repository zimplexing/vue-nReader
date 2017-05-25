// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Ajax from './libs/ajax';

Vue.config.productionTip = false;
Vue.use(Ajax, {
  baseURL: 'http://localhost:3000'
});

const bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
