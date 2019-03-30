import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answerRange: 0,
    currentRoute: {},
  },
  mutations: {
    routeChange(state, route) {
      state.currentRoute = route; //eslint-disable-line
    },
  },
  actions: {
  },
});
