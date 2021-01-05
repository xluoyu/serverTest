const order = [
  // {
  //   path: '/order',
  //   name: 'order',
  //   redirect: '/order/list',
  //   component: () => import("@/views/order/list.vue"),
  //   children: [
      {
        path: '/list',
        name: 'list',
        component: () => import("@/views/order/list.vue"),
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import("@/views/order/detail.vue"),
      },
  //   ]
  // }
]

export default order