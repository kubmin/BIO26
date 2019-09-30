import Vue from 'vue';
import Router from 'vue-router';
import Grid from './components/Grid.vue'
import Result from './components/Result.vue'
import PageNotFound from './components/PageNotFound.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Grid',
      component: Grid,
    },
    {
      path: '/result/:sIdx/:eIdx',
      name: 'Result',
      component: Result,
      props: true,
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,

    }
  ],
});
