<template>
  <b-input-group>
    <b-input-group-prepend is-text class="ml-2">
      <font-awesome-icon :icon="['fas', 'search']" />
    </b-input-group-prepend>
    <b-form-input
      v-model="text"
      v-on:keyup.enter="hunt"
      placeholder="Enter your search document"
      :size="size"
    >
    </b-form-input>
    <b-input-group-append>
      <b-button v-if="text" @click="clear" type="reset" variant="light">
        <font-awesome-icon :icon="['fas', 'times']" />
      </b-button>
      <b-button v-else disabled type="reset" variant="light">
        <font-awesome-icon :icon="['fas', 'times']" />
      </b-button>
    </b-input-group-append>
    <b-input-group-append>
      <b-button v-if="text" @click="hunt" variant="primary" class="mr-2">
        <font-awesome-icon :icon="['fas', 'crosshairs']" />
      </b-button>
      <b-button v-else disabled variant="primary" class="mr-2">
        <font-awesome-icon :icon="['fas', 'crosshairs']" />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: "Hunter",
  props: ["alignment", "size"],
  data: function() {
    return {
      text: ""
    };
  },
  created: function() {
    if (this.$route.query) {
      this.text = this.$route.query.target;
    }
  },
  watch: {
    $route: function() {
      if (this.$route.query) {
        this.text = this.$route.query.target;
      }
    }
  },
  methods: {
    hunt: function() {
      const query = { target: this.text };
      this.$store.dispatch("updateQuery", query);
      this.$router.push({ name: "search", query: query });
    },
    clear: function() {
      this.text = "";
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
