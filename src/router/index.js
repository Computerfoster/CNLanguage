import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/index')
    },

    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404')
    },

    {
      path: '/new',
      name: 'new',
      component: () => import('@/views/form/index')
    },

    {
      path: '/addAdmin',
      name: 'addAdmin',
      component: () => import('@/views/create/index')
    },

    {
      path: '/manage',
      name: 'manage',
      component: () => import('@/views/table/index')
    },
    {
      path: '/manage/edit/:id(\\d+)',
      name: 'edit',
      component: () => import('@/views/form/index')
    }
  ]
})
