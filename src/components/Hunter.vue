<template>
  <div>
    <b-input-group>
      <b-input-group-prepend is-text class="ml-2">
        <font-awesome-icon :icon="['fas', 'search']" />
      </b-input-group-prepend>
      <b-form-input
        v-model="text"
        v-on:keyup.enter="hunt"
        placeholder="Enter your search document"
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
  </div>
</template>

<script>
export default {
  name: "Hunter",
  data: function() {
    return {
      text: ""
    };
  },
  computed: {
    huntParams: function() {
      const params = new URLSearchParams();
      params.append(
        "target",
        this.text.startsWith("~") ? this.text.substr(1) : this.text
      );
      return params;
    }
  },
  methods: {
    hunt: function() {
      const huntUrl = this.text.startsWith("~")
        ? "http://18.224.169.209:8082/snipe"
        : "http://18.224.169.209:8081/hunt";
      this.$http
        /* .get(
          "https://122383a581114da9bc8fab766c8bc512" +
            ".vfs.cloud9.us-east-2.amazonaws.com:8081/hunt",
          { params: this.huntParams }
        ) */
        .get(huntUrl, { params: this.huntParams })
        .then(res => {
          console.log("dispatching fresh kills");
          this.$store.dispatch("updateKills", res.data);
        })
        .catch(err => {
          console.log(err);
        });
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
