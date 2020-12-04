import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const HTTPClient = axios.create({
  baseURL: 'http://localhost:3005'
})

export {
  HTTPClient
}
