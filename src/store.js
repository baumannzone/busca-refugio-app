import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export default new Vuex.Store( {
  state: {
    GUILD_NAME: 'Busca Refugio',
    auth: {
      isLogged: false,
      displayName: null,
      id: null,
    },
  },
  getters: {
    isUserLoggedIn: state => state.auth.isLogged,
  },
  mutations: {
    logUserIn( state, userData ) {
      state.auth.isLogged = true;
      state.auth.id = userData.uid;
      state.auth.user = userData.displayName;
    },
  },
  actions: {},
} );
