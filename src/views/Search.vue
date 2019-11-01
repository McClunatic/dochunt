<template>
  <b-container fluid>
    <b-navbar toggleable="md">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/doc-hunt-logo.svg" alt="DocHunt" />
      </router-link>
      <b-nav-form v-on:submit.prevent>
        <hunter alignment="align-items-left" size="md"></hunter>
      </b-nav-form>
      <b-navbar-nav v-if="!user" class="ml-auto">
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
          <b-dropdown-item href="#">Sign out</b-dropdown-item>
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
      return this.$store.state.user.username;
    }
  }
};
</script>

<style scoped>
img {
  max-height: 28px;
}
</style>
