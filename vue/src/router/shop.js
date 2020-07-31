const routes = [
  {
    path: '/shop',
    name: 'Shop',
    redirect: '/shop/home',
    component: () => import("@/views/shop/Base.vue"),
    children: [
      {
        path: '/shop/home',
        name: 'ShopHome',
        component: () => import("@/views/shop/Home.vue")
      },
      {
        path: '/shop/cart',
        name: 'ShopCart',
        component: () => import("@/views/shop/Cart.vue")
      },
      {
        path: '/shop/my',
        name: 'ShopMy',
        component: () => import("@/views/shop/My.vue")
      },
    ]
  }

]

export default routes