import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userType: undefined
  },
  mutations: {
    userType(state, userType) {
      state.userType = userType // eslint-disable-line no-param-reassign
    }
  },
  getters: {
    userType: state => state.userType
  }
});

export default store;