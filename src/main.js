// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar);

import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = '/api'
/* let base = process.env.NODE_ENV === 'production' ?'http://10.39.1.234:8080':'http://10.39.1.25:8081';
Vue.prototype.baseURL = base; */
axios.defaults.baseURL = process.env.NODE_ENV==="production"?"http://10.39.1.234:8080":"/api"
// axios.defaults.baseURL


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
