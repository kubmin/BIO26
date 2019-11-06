import Vue from 'vue';
import Router from 'vue-router';
import Grid from './components/Grid.vue'
import Result from './components/Result.vue'
import PageNotFound from './components/PageNotFound.vue'
// Quarters
import TopLeft from './components/grid/TopLeft.vue'
import TopRight from './components/grid/TopRight.vue'
import BottomLeft from './components/grid/BottomLeft.vue'
import BottomRight from './components/grid/BottomRight.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/1',
      name: 'TopLeft',
      component: TopLeft,
    },
    {
      path: '/2',
      name: 'TopRight',
      component: TopRight,
    },
    {
      path: '/3',
      name: 'BottomLeft',
      component: BottomLeft,
    },
    {
      path: '/4',
      name: 'BottomRight',
      component: BottomRight,
    },
    // {
    //   path: '/',
    //   name: 'Grid',
    //   component: Grid,
    // },
    // {
    //   path: '/result/:sIdx/:eIdx',
    //   name: 'Result',
    //   component: Result,
    //   props: true,
    // },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,

    }
  ],
});
