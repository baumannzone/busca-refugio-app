import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home/Index.vue';
import Login from '@/views/Login/Index.vue';
import BattleTagCreate from '@/views/BattleTag/BattleTagCreate.vue';
import Clan from '@/views/Clan/Index.vue';

Vue.use( Router );

const router = new Router( {
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiredAuth: false },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiredAuth: false },
    },
    {
      path: '/register',
      name: 'BattleTag-Create',
      component: BattleTagCreate,
      meta: { requiredAuth: false },
    },
    {
      path: '/clan',
      name: 'Clan',
      component: Clan,
      meta: { requiredAuth: false },
    },
    {
      path: '/clan/edit',
      name: 'ClanEdit',
      component: Clan,
      meta: { requiredAuth: true },
    },
  ],
} );

export default router;
