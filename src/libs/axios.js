import Vue from 'vue'

// axios
import axios from 'axios'
import JwtService from '@/auth/jwt/graphJwtService'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
   baseURL: 'https://develop.interactvty.com/graphql/'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})
axios.defaults.baseURL = 'https://develop.interactvty.com/graphql/'
const jwt = new JwtService(axios);

Vue.prototype.$http = jwt.axiosIns

export default jwt.axiosIns
