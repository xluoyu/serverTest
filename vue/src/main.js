import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Rem from './utils/rem'
import Loading from './components/Loading'

Vue.config.productionTip = false
Vue.prototype.$loading = Loading
Vue.prototype.eventBus = new Vue

new Vue({
  router,
  store,
  Rem,
  render: h => h(App)
}).$mount('#app')
