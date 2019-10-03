<template>
  <div id="app">
    <b-jumbotron header="DocHunt" lead="Documentation Hunting Made Easy">
      <p>Visit the following for more information!</p>
      <b-button variant="info" href="#">More Info</b-button>
    </b-jumbotron>
    <hunter text=""></hunter>
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
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.jumbotron {
  background-image: url("./assets/logo.png");
  background-repeat: no-repeat;
  background-position: right center;
  text-align: left;
}
</style>
