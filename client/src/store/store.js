import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  debug: false,
  path: 'http://95.87.143.32:5000/',
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
