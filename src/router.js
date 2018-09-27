import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      // path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/menu',
      // path: '/',
      name: 'menu',
      component: () => import('./views/Menu.vue')
    },
    {
      path: '/detail',
      // path: '/',
      name: 'detail',
      component: () => import('./views/DetailMenu.vue')
    },
    {
      path: '/yudha',
      name: 'yudha',
      component: () => import('./views/AddBarang.vue')
    },
    {
      path:'/yudhasboard',
      name: 'yudhasboard',
      component: () => import('./views/Yudhasboard.vue')
    }
  ]
})
