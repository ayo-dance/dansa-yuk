import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Room from '../views/Room.vue'
import Dashboard from '../views/Dashboard.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/room',
    name: 'Room',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Room
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    component: Dashboard 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLogin) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (isLogin) {
      next("/room") // make sure to always call next()!
    }else{
      next() // make sure to always call next()!
    }
  }
})

export default router