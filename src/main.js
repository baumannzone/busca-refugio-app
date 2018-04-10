import Vue from 'vue';
import Vuetify from 'vuetify';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

firebase.initializeApp( {
  projectId: 'buscarefugio',
  databaseURL: 'https://buscarefugio.firebaseio.com',
} );

const db = firebase.firestore();
export default db;

Vue.use( VueFire );
Vue.use( Vuetify );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  render: h => h( App ),
} ).$mount( '#app' );
