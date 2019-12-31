import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/main'
import Form from '../views/main/form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    }
  ]
})
