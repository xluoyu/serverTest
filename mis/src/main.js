import Vue from 'vue'
import Router from 'vue-router'
import Login from './Login.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './style/base.less'

Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(Login)
}).$mount('#app')
