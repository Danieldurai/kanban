import Vue from "vue";
import App from "./App.vue";
import vueKanban from "vue-kanban";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

Vue.use(PrimeVue);

Vue.use(vueKanban);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
