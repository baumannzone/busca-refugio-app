import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home/Index.vue';
import Login from '@/views/Login/Index.vue';
import BattleTagCreate from '@/views/BattleTag/BattleTagCreate.vue';

Vue.use( Router );

const router = new Router( {
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'BattleTag-Create', component: BattleTagCreate },
    {
      path: '/repository',
      name: 'Repository',
      beforeEnter() {
        window.location.href = 'https://github.com/baumannzone/busca-refugio-app';
      },
    },
  ],
} );

export default router;
