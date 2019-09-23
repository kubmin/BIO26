import Vue from 'vue';
import Router from 'vue-router';
import ImagesGrid from './components/ImagesGrid.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ImagesGrid',
      component: ImagesGrid,
    },
  ],
});
