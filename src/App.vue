<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch("logout");
      }
      Promise.reject(err);
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
