import Vue from "vue";
import Buefy from "buefy";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import App from "./App.vue";
import router from "./router";

import i18n from "./i18n";
import store from "./store/index";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

Vue.use(VueToast);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
