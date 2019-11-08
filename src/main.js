import "@babel/polyfill";
import "mutationobserver-shim";
import devtools from "@vue/devtools";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/pretty-checkbox-vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCrosshairs,
  faSearch,
  faSearchPlus,
  faSearchMinus,
  faTimes,
  faGreaterThanEqual,
  faUser,
  faKey,
  faEnvelope,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "typeface-press-start-2p";
import VCalendar from "v-calendar";

library.add(
  faCrosshairs,
  faSearch,
  faSearchPlus,
  faSearchMinus,
  faTimes,
  faGreaterThanEqual,
  faUser,
  faKey,
  faEnvelope,
  faCalendar
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueAxios, axios);
Vue.use(VCalendar);

const token = localStorage.getItem("token");
const promises = [];
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  promises.push(
    axios
      .get(`${process.env.VUE_APP_API_URL}/user`)
      .then(res => {
        store.commit("authenticated", {
          token: token,
          user: res.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  );
}

Vue.config.productionTip = false;

if (
  process.env.NODE_ENV === "development" &&
  process.env.VUE_APP_DEVTOOLS_CONNECT === "true"
) {
  devtools.connect();
}

Promise.all(promises).then(() => {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount("#app");
});
