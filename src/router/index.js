import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

import Home from '../views/Home.vue'
import Cars from '../views/Cars.vue'
import Services from '../views/Services.vue'
import Calculator from '../views/Calculator.vue'
import News from '../views/News.vue'
import Contacts from '../views/Contacts.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main-layout' },
    component: Home
  },
  {
    path: '/cars',
    name: 'Cars',
    meta: { layout: 'main-layout' },
    component: Cars
  },
  {
    path: '/services',
    name: 'services',
    meta: { layout: 'main-layout' },
    component: Services
  },
  {
    path: '/calculator',
    name: 'calculator',
    meta: { layout: 'main-layout' },
    component: Calculator
  },
  {
    path: '/news',
    name: 'news',
    meta: { layout: 'main-layout' },
    component: News
  },
  {
    path: '/contacts',
    name: 'contacts',
    meta: { layout: 'main-layout' },
    component: Contacts
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'main-layout' },
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { layout: 'main-layout', auth: true },
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('login')
  } else { next() }
})

export default router
