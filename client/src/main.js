import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls';

import store from './store/store.js'
import router from './router.js'

Vue.config.productionTip = false

const options = {
  namespace: 'sfs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
}

Vue.use(Storage, options)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#bio-26')
