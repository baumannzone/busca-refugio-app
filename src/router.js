import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Index.vue';
import BattleTagCreate from '@/views/BattleTag/BattleTagCreate.vue';

Vue.use( Router );

const router = new Router( {
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/register', name: 'BattleTag-Create', component: BattleTagCreate },
  ],
} );

export default router;
