import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export default new Vuex.Store( {
  state: {
    auth: {
      isLogged: false,
      displayName: null,
      uid: null,
      tokenId: null,
    },
  },
  getters: {
    isUserLoggedIn: state => state.auth.isLogged,
  },
  mutations: {
    logUserIn( state, userData ) {
      state.auth = {
        isLogged: true,
        displayName: userData.displayName,
        uid: userData.uid,
        tokenId: userData.qa,
      };
    },
    logUserOut( state ) {
      state.auth = {
        isLogged: false,
        displayName: null,
        uid: null,
        tokenId: null,
      };
    },
  },
  actions: {},
} );
