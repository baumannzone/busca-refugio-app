import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export default new Vuex.Store( {
  state: {
    auth: {
      isLogged: false,
      email: null,
      uid: null,
      tokenId: null,
    },
  },
  getters: {
    isUserLogged: state => state.auth.isLogged,
    loggedUserEmail: state => state.auth.email,
  },
  mutations: {
    logUserIn( state, userData ) {
      state.auth = {
        isLogged: true,
        email: userData.email,
        uid: userData.uid,
        tokenId: userData.qa,
      };
    },
    logUserOut( state ) {
      state.auth = {
        isLogged: false,
        email: null,
        uid: null,
        tokenId: null,
      };
    },
  },
  actions: {},
} );
