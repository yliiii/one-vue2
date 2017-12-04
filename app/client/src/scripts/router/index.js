import Vue from 'vue'
import VueRouter from 'vue-router'
import Components from './components'

Vue.use(VueRouter)

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('pages/index')
      },
      {
        path: '/home',
        component: () => import('pages/Home')
      },
      Components
    ]
  })
}