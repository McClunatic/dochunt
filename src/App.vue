<template>
  <div id="app">
    <b-jumbotron header="DocHunt" lead="Documentation Hunting Made Easy">
      <p>Visit the following for more information!</p>
      <b-button variant="info" href="#">More Info</b-button>
    </b-jumbotron>
    <hunter text=""></hunter>
    <trophies :kills="kills"></trophies>
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
  data: function() {
    return {
      kills: [
        {
          number: "A-1",
          author: "Brian McClune",
          subject: "Very Cool",
          date: new Date(1983, 1, 13).toLocaleDateString("en-CA")
        },
        {
          number: "A-2",
          author: "Brendan McClune",
          subject: "Still Pretty Good",
          date: new Date(1984, 4, 30).toLocaleDateString("en-CA")
        },
        {
          number: "A-3",
          author: "Megan McClune",
          subject: "Somehow Also Solid",
          date: new Date(1986, 10, 3).toLocaleDateString("en-CA")
        }
      ]
    };
  }
};
</script>

<style>
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
</style>
