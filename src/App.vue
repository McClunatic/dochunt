<template>
  <div id="app">
    <b-jumbotron header="DocHunt" lead="Take aim, fire, and score!">
      <p>Documentation hunting made easy. Click to learn more.</p>
      <b-button variant="info" href="#">More Info</b-button>
    </b-jumbotron>
    <hunter></hunter>
    <trophies></trophies>
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
p.lead {
  font-family: "Press Start 2P";
}
</style>
