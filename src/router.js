import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Search from "./views/Search.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("token");
        if (!token) next({ name: "login" });
        else next();
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("token");
        if (token) next({ name: "home" });
        else next();
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("token");
        if (token) next({ name: "home" });
        else next();
      }
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("token");
        if (!token) next({ name: "login", next: { path: to.fullPath } });
        else next();
      }
    }
  ]
});
