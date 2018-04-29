import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '/vue-agile',
      name: 'vue-agile',
      component: require('@/components/vue-agile').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
