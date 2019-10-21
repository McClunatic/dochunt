<template>
  <b-container fluid>
    <b-navbar toggleable="md">
      <router-link tag="b-navbar-brand" to="/">
        <img src="@/assets/doc-hunt-logo.svg" alt="DocHunt" />
      </router-link>
      <b-nav-form v-on:submit.prevent>
        <hunter alignment="align-items-left" size="md"></hunter>
      </b-nav-form>
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
  }
};
</script>

<style scoped>
img {
  max-width: 64px;
}
</style>
