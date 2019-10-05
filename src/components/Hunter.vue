<template>
  <div>
    <b-input-group>
      <b-input-group-prepend is-text class="ml-2">
        <font-awesome-icon :icon="['fas', 'search']" />
      </b-input-group-prepend>
      <b-form-input v-model="text" placeholder="Enter your search document">
      </b-form-input>
      <b-input-group-append>
        <b-button v-if="text" @click="hunt" variant="primary" class="mr-2">
          <font-awesome-icon :icon="['fas', 'crosshairs']" />
        </b-button>
        <b-button v-else disabled @click="hunt" variant="primary" class="mr-2">
          <font-awesome-icon :icon="['fas', 'crosshairs']" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: "Hunter",
  data: function() {
    return {
      text: "",
      freshKills: []
    };
  },
  methods: {
    hunt: function() {
      this.freshKills = [
        {
          number: "A-4",
          author: "Susan McClune",
          subject: "Legit",
          date: new Date(1953, 4, 18).toLocaleDateString("en-CA")
        },
        {
          number: "A-5",
          author: "Kevin McClune",
          subject: "Forever",
          date: new Date(1947, 9, 29).toLocaleDateString("en-CA")
        },
        {
          number: "A-6",
          author: "Helen Hackett",
          subject: "Sassier Every Day",
          date: new Date(1933, 3, 6).toLocaleDateString("en-CA")
        },
        {
          number: "A-7",
          author: "Edward Hackett",
          subject: "Legend",
          date: new Date(1933, 5, 6).toLocaleDateString("en-CA")
        }
      ];
      this.$emit("gotsome", this.freshKills);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
