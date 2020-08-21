import Vue from 'vue'
import App from './App.vue'
// import axios from './fetch'
import router from './router'
import store from './store'
import Rem from './utils/rem'

Vue.config.productionTip = false

// Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  Rem,
  render: h => h(App)
}).$mount('#app')
