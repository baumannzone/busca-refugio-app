import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';

import routes from './routes';

Vue.use( Router );

const router = new Router( {
  routes,
} );

router.beforeEach( ( to, from, next ) => {
  if ( to.meta.requiredAuth ) {
    if ( store.getters.isUserLogged ) {
      next();
    }
    else {
      next( { name: 'Login' } );
    }
  }
  else {
    next();
  }
} );

export default router;
