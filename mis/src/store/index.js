import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: 'default',
    user: {}
  },
  mutations: {
    changeLoginStatus (state, status) {
      state.loginStatus = status
    },
    changeUser (state, data) {
      state.user = data
    },
  },
  actions: {
  },
  modules: {
  }
})
