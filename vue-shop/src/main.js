// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//导入elment-ui
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
import './assets/font/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = 'http://119.23.53.78:8888/api/private/v1/'
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // config请求对象
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.component('tree-table',TreeTable)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
