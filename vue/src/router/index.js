import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Shop from './shop'

Vue.use(VueRouter)

const routes = [
  ...Shop,
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]

const router = new VueRouter({
  routes
})

export default router
