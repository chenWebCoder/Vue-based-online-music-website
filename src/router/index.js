import Vue from 'vue';
import Router from 'vue-router';

// const Music = r => require.ensure([], () => r(require('@/components/music/music.vue')), 'default');
import Mymusic from '@/components/mymusic/mymusic';

import MusicHall from '@/components/musichall/musichall';
import MusicFind from '@/components/musicsearch/musicsearch';

Vue.use(Router);

export default new Router({
// { path: '/index', component: resolve => require(['./index.vue'], resolve) },
  routes: [
    {
      path: '/mymusic',
      name: 'Mymusic',
      component: Mymusic
    },
    {
      path: '/musichall',
      name: 'MusicHall',
      component: MusicHall
    },
    {
      path: '/musicfind',
      name: 'MusicFind',
      component: MusicFind
    },
    {
      path: '/*',
      redirect: '/mymusic'
    }
  ]
});
