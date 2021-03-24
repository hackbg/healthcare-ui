import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Welcome from './components/Welcome.vue';
import Insurance from './components/Insurance.vue';
import Prescriptions from './components/Prescriptions.vue';
import NotFound from './components/NotFound.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass:'is-active',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/insurance',
      name: 'Insurance',
      component: Insurance,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/prescriptions',
      name: 'Prescriptions',
      component: Prescriptions,
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

export default router;
