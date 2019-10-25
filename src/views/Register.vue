<template>
  <b-container>
    <register-card></register-card>
  </b-container>
</template>

<script>
// @ is an alias to /src
import RegisterCard from "@/components/RegisterCard.vue";

export default {
  name: "register",
  components: {
    RegisterCard
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
