<template>
  <b-input-group>
    <b-input-group-prepend is-text class="ml-2">
      <p-check class="p-icon p-plain" color="primary-o" v-model="snipe" toggle>
        <font-awesome-icon :icon="['fas', 'search-plus']" slot="extra" />
        Snipe
        <font-awesome-icon :icon="['fas', 'search']" slot="off-extra" />
        <label slot="off-label">Hunt</label>
      </p-check>
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
    <b-input-group-append v-if="snipe">
      <b-dropdown :text="target.toString() + ' best'" variant="primary">
        <b-dropdown-item
          v-for="option in targetOptions"
          v-model="target"
          :key="option.value"
          :active="target === option.value"
          @click="updateTarget(option.value)"
        >
          {{ option.text }}
        </b-dropdown-item>
      </b-dropdown>
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
      text: "",
      target: 10,
      targetOptions: [
        { value: 10, text: "10 best" },
        { value: 20, text: "20 best" },
        { value: 50, text: "50 best" },
        { value: 100, text: "100 best" }
      ]
    };
  },
  computed: {
    snipe: {
      get() {
        return this.$store.state.mode === "snipe";
      },
      set(value) {
        this.$store.commit("updateMode", value ? "snipe" : "hunt");
      }
    }
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
      if (this.snipe) query.num_best = this.target;
      this.$store.dispatch("updateQuery", query);
      this.$router.push({ name: "search", query: query });
    },
    updateTarget: function(target) {
      this.target = target;
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

.p-toggle {
  min-width: 90px;
  text-align: left;
}

.input-group >>> .dropdown-menu {
  min-width: 0rem;
}
</style>
