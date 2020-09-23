import Vue from 'vue'
import vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

import './assets/styles/styles.scss'
import '../node_modules/@braid/vue-formulate/themes/snow/snow.scss'

import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyBKfDe9rLjnESRJVoqhRy7KiVxHQnhYn3U',
  authDomain: 'usa-cars-2020.firebaseapp.com',
  databaseURL: 'https://usa-cars-2020.firebaseio.com',
  projectId: 'usa-cars-2020',
  storageBucket: 'usa-cars-2020.appspot.com',
  messagingSenderId: '906485989136',
  appId: '1:906485989136:web:37938e275975434eb62f95',
  measurementId: 'G-H948X886HB'
})

let app

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuex,
      render: h => h(App)
    }).$mount('#app')
  }
  store.commit('updateUser', user)
})

store.dispatch('getAllAdvs')
