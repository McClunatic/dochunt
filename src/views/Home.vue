<template>
  <b-container fluid>
    <b-navbar toggleable="md">
      <b-navbar-nav class="mr-auto">
        <b-nav-item href="#">About</b-nav-item>
      </b-navbar-nav>
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
          <b-dropdown-item v-b-modal.modal-profile>Profile</b-dropdown-item>
          <profile :username="username"></profile>
          <b-dropdown-item-button @click="logout">
            Sign out
          </b-dropdown-item-button>
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
import Profile from "@/components/Profile.vue";

export default {
  name: "home",
  components: {
    Hunter,
    Profile
  },
  computed: {
    username: function() {
      return this.$store.state.user ? this.$store.state.user.username : null;
    }
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("login");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
