<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import interceptor from "./interceptor";

export default {
  created: function() {
    this.$http.interceptors.response.eject(interceptor);
    this.$http.interceptors.response.use(undefined, err => {
      return new Promise((resolve, reject) => {
        let res = err.response;
        if (res.status === 200) resolve();
        if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
          Vue.nextTick(() => this.$store.dispatch("logout"));
        }
        reject(err);
      });
    });
  }
};
</script>

<style lang="scss">
body {
  height: 100vh;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
h1 {
  font-family: "Press Start 2P";
  text-align: center;
}
</style>
