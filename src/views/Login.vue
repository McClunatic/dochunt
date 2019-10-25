<template>
  <b-container>
    <login-card></login-card>
  </b-container>
</template>

<script>
// @ is an alias to /src
import LoginCard from "@/components/LoginCard.vue";

export default {
  name: "login",
  components: {
    LoginCard
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
