import axios from 'axios'

axios.interceptors.request.use(function (config) {
  if (process.env.NODE_ENV === 'development') {
    config.url = `/api${config.url}`
  } else {
    config.baseURL = 'http://65.49.197.99:3000/'
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default axios
