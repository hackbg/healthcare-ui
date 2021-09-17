import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Welcome from './components/Welcome.vue';
import InsuranceDoctor from './components/InsuranceDoctor.vue';
import InsurancePatient from './components/InsurancePatient.vue';
import InsuranceInsurer from './components/InsuranceInsurer.vue';
import PrescriptionsPatient from './components/PrescriptionsPatient.vue';
import PrescriptionsDoctor from './components/PrescriptionsDoctor.vue';
import PrescriptionsPharmacy from './components/PrescriptionsPharmacy.vue';
import NotFound from './components/NotFound.vue';
import store from './store';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass:'is-active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Welcome',
      component: Welcome,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/insurance',
      name: 'Insurance',
      component: {
        render: (h) => {
          switch (store.state.userType) {
            case "patient":
              return h(InsurancePatient);
            case "doctor":
              return h(InsuranceDoctor);
            case "insurer":
              return h(InsuranceInsurer);
            default:
              return h(Home);
          }
        }
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/prescriptions',
      name: 'Prescriptions',
      component: {
        render: (h) => {
          switch (store.state.userType) {
            case "patient":
              return h(PrescriptionsPatient);
            case "doctor":
              return h(PrescriptionsDoctor);
            case "pharmacy":
              return h(PrescriptionsPharmacy);
            default:
              return h(Home);
          }
        }
      },
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
