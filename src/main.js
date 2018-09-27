import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'cobacoba-eb750',
  databaseURL: 'https://cobacoba-eb750.firebaseio.com'
})
export const db = firebase.firestore()