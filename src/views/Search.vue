<template>
  <b-container fluid>
    <b-navbar toggleable="md">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/doc-hunt-logo.svg" alt="DocHunt" />
      </router-link>
      <b-nav-form v-on:submit.prevent>
        <hunter alignment="align-items-left" size="md"></hunter>
      </b-nav-form>
      <b-navbar-nav v-if="!username" class="ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ username }}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item-button @click="logout">
            Sign out
          </b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <trophies></trophies>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Hunter from "@/components/Hunter.vue";
import Trophies from "@/components/Trophies.vue";

export default {
  name: "search",
  components: {
    Hunter,
    Trophies
  },
  computed: {
    username: function() {
      return this.$store.state.user ? this.$store.state.user.username : null;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("login");
      });
    }
  }
};
</script>

<style scoped>
img {
  max-height: 28px;
}
</style>
