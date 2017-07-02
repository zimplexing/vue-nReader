// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueTouch from 'vue-touch'
import router from './router'
import Ajax from './utils/ajax'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vuescroll from 'vue-scroll'

Vue.use(vuescroll)
VueTouch.config.swipe = {
  direction: 'horizontal'
}

Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(MintUI)
Vue.config.productionTip = false
Vue.use(Ajax, {
  baseURL: 'http://35.189.165.140:3000/'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

// Disable context menu
document.addEventListener('contextmenu', event => {
  event.preventDefault()
  event.stopPropagation()
})
