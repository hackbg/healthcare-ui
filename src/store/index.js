import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    web3: undefined,
    userType: undefined,
    pendingTxHashes: [],
  },
  mutations: {
    web3(state, web3) {
      state.web3 = web3; // eslint-disable-line no-param-reassign
    },
    userType(state, userType) {
      state.userType = userType; // eslint-disable-line no-param-reassign
    },
    pendingTxHashes(state, pendingTxHashes) {
      state.pendingTxHashes = pendingTxHashes; // eslint-disable-line no-param-reassign
    },
  },
  getters: {
    web3: (state) => state.web3,
    userType: (state) => state.userType,
    pendingTxHashes: (state) => state.pendingTxHashes,
  },
});

export default store;
