<template>
  <b-container>
    <b-navbar toggleable="md">
      <b-navbar-brand href="#">
        <img src="@/assets/doc-hunt-logo.svg" alt="DocHunt" />
      </b-navbar-brand>
      <hunter></hunter>
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
