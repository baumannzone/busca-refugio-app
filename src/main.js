import Vue from 'vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

import './assets/styles/_main.styl';

Vue.use( Vuetify );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  render: h => h( App ),
} ).$mount( '#app' );
