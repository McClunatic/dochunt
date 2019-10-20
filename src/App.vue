<template>
  <div id="app">
    <b-img fluid center src="./assets/doc-hunt-logo.svg"></b-img>
    <h1 class="pt-4 pb-3">DocHunt</h1>
    <hunter></hunter>
    <trophies v-if="kills.length"></trophies>
  </div>
</template>

<script>
import Hunter from "./components/Hunter.vue";
import Trophies from "./components/Trophies.vue";

export default {
  name: "app",
  components: {
    Hunter,
    Trophies
  },
  computed: {
    kills: function() {
      return this.$store.state.kills;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.jumbotron {
  background-image: url("./assets/doc-hunt-logo.svg");
  background-repeat: no-repeat;
  background-position: 99% center;
}
.jumbotron > h1 {
  font-family: "Press Start 2P";
}
h1 {
  font-family: "Press Start 2P";
  text-align: center;
}
</style>
