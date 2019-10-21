<template>
  <b-container>
    <b-img fluid center class="mt-5" src="@/assets/doc-hunt-logo.svg"></b-img>
    <h1 class="pt-4 pb-3">DocHunt</h1>
    <hunter alignment="align-items-center" size="lg"></hunter>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Hunter from "@/components/Hunter.vue";

export default {
  name: "home",
  components: {
    Hunter
  }
};
</script>
