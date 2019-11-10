import "@babel/polyfill";
import "mutationobserver-shim";
import devtools from "@vue/devtools";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/pretty-checkbox-vue";
import App from "./App.vue";
import { createStore } from "./store";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCrosshairs,
  faSearch,
  faSearchPlus,
  faSearchMinus,
  faPlus,
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
  faPlus,
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

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development") {
  devtools.connect();
}

const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// get user and fields data from API to initialize store
const promises = [];
let initialState = {
  user: null,
  token: null,
  status: null,
  fields: null,
  kills: [],
  tags: []
};

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  promises.push(
    axios
      .get(`${process.env.VUE_APP_API_URL}/user`)
      .then(res => {
        initialState.user = res.data;
        initialState.token = token;
        initialState.status = "authenticated";
      })
      .catch(err => {
        console.log(err);
      })
  );
}

promises.push(
  axios
    .get(`${process.env.VUE_APP_API_URL}/fields`)
    .then(res => {
      initialState.fields = res.data;
    })
    .catch(err => {
      console.log(err);
    })
);

Promise.all(promises).then(() => {
  const store = createStore(initialState);
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount("#app");
});
