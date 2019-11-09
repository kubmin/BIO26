import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const state = {
  debug: false,
  path: 'http://192.168.0.53:5000/',
  images: [],
}

const mutations = {
  setter(state, data) {
    state[data[0]] = data[1]
  },
}

export default new Vuex.Store({
  state,
  mutations,
})
