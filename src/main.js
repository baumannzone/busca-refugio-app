import Vue from 'vue';
import Vuetify from 'vuetify';
import _ from 'lodash';
import moment from 'moment';

import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './router/router';
import store from './store';

import './assets/styles/_main.styl';

Vue.use( Vuetify );

Object.defineProperty( Vue.prototype, '$_', { value: _ } );
Object.defineProperty( Vue.prototype, '$moment', { value: moment } );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  render: h => h( App ),
} ).$mount( '#app' );
