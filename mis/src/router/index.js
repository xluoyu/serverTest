import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard.vue')
  },
  {
    path: '/manage/router',
    name: 'manageRouter',
    component: () => import('../views/manage/router.vue')
  },
  {
    path: '/manage/role',
    name: 'manageRole',
    component: () => import('../views/manage/role.vue')
  },
  {
    path: '/manage/user',
    name: 'manageUser',
    component: () => import('../views/manage/user.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
