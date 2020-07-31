import Vue from 'vue'
import Login from './Login.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './style/base.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Login)
}).$mount('#app')
