<template>
  <b-container fluid>
    <b-navbar toggleable="md">
      <b-navbar-nav v-if="!user" class="ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ user }}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <b-img fluid center class="pt-5" src="@/assets/doc-hunt-logo.svg"></b-img>
      <h1 class="pt-4 pb-3">DocHunt</h1>
      <hunter alignment="align-items-center" size="lg"></hunter>
    </b-container>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Hunter from "@/components/Hunter.vue";

export default {
  name: "home",
  components: {
    Hunter
  },
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  }
};
</script>
