import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Is_logged_in:false
  },
  mutations: {
    set_loginstatus(state,data) {
      state.Is_logged_in = data;
      console.log(data)
    },
  },
  getters: {
    Is_logged_in: state => {
      return state.Is_logged_in;
    }
  },
  actions: {
  },
  modules: {
  }
})
