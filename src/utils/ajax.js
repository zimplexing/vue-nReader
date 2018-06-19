import axios from 'axios'

export default {
  install (Vue, option = {
    baseURL: 'http://65.49.197.99:3000/'
  }) {
    const http = axios.create(option)
    Vue.http = http
    Vue.prototype.$http = http
  }
}
