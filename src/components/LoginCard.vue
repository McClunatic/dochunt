<template>
  <div class="row justify-content-center h-100">
    <div class="col-4 my-auto mx-auto">
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4>Sign In!</h4>
        </template>
        <b-input-group class="p-2">
          <b-input-group-prepend is-text>
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
          </b-input-group-prepend>
          <b-form-input placeholder="Username"></b-form-input>
        </b-input-group>
        <b-input-group class="p-2">
          <b-input-group-prepend is-text>
            <font-awesome-icon :icon="['fas', 'key']"></font-awesome-icon>
          </b-input-group-prepend>
          <b-form-input placeholder="Password"></b-form-input>
        </b-input-group>
        <div class="p-2 mt-2">
          <b-button block variant="primary">Login</b-button>
        </div>
        <template v-slot:footer>
          Don't have an account? <b-link href="#">Sign Up</b-link>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginCard"
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P");

h4 {
  margin-top: 8px;
  font-family: "Press Start 2P";
  text-align: center;
}

.card-header {
  background-image: url("../assets/doc-hunt-logo.svg");
  background-position: right center;
  background-size: contain;
  background-repeat: no-repeat;
}

.card {
  height: 350px;
  width: 350px;
}

.card-footer {
  text-align: center;
}

.input-group-text {
  min-width: 42px;
}
</style>
