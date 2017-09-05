import Vue from 'vue'
import VueRouter from 'vue-router'
import Components from './components'
import Index from 'pages/index.vue'

Vue.use(VueRouter)

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Index,
        children: [
          {
            path: 'home',
            component: () => import('pages/Home')
          },
          Components
        ]
      }
    ]
  })
}