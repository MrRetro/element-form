// import Vue from 'vue'
// import Router from 'vue-router'
//
// Vue.use(Router)

/* eslint-disable */
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/main')
    },
    {
      path: '/:index/:type',
      name: 'main',
      component: () => import('../views/main')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/main/form')
    }
  ]
})
