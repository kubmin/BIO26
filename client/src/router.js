import Vue from 'vue';
import Router from 'vue-router';
import ImagesFlex from './components/ImagesFlex.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ImagesFlex',
      component: ImagesFlex,
    },
  ],
});
