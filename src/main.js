import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyBmEIryvFdTv9ZT7oR-hVd-p8GBTOunMSk",
  authDomain: "cobacoba-eb750.firebaseapp.com",
  databaseURL: "https://cobacoba-eb750.firebaseio.com",
  projectId: "cobacoba-eb750",
  storageBucket: "cobacoba-eb750.appspot.com",
  messagingSenderId: "399864848892"
})
export const db = firebase.firestore()
export const storage = firebase.storage();