import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Shop from './shop'
import Test from '../views/Test.vue'
import Order from './order'

Vue.use(VueRouter)

const routes = [
  ...Shop,
  ...Order,
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
