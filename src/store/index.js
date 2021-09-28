import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userType: undefined,
    pendingTxHashes: []
  },
  mutations: {
    userType(state, userType) {
      state.userType = userType // eslint-disable-line no-param-reassign
    },
    pendingTxHashes(state, pendingTxHashes) {
      state.pendingTxHashes = pendingTxHashes; // eslint-disable-line no-param-reassign
    }
  },
  getters: {
    userType: state => state.userType,
    pendingTxHashes: state => state.pendingTxHashes
  }
});

export default store;