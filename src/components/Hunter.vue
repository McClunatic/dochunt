<template>
  <div>
    <b-input-group>
      <b-input-group-prepend is-text class="ml-2">
        <font-awesome-icon :icon="['fas', 'search']" />
      </b-input-group-prepend>
      <b-form-input v-model="text" placeholder="Enter your search document">
      </b-form-input>
      <b-input-group-append>
        <b-button variant="primary" class="mr-2">Hunt</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: "Hunter",
  props: {
    text: String
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
