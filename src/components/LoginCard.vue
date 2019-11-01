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
          <b-form-input
            v-model="username"
            :state="usernameState"
            v-on:keyup.enter="submit"
            autofocus
            placeholder="Username"
          ></b-form-input>
          <b-form-invalid-feedback v-html="usernameFeedback">
          </b-form-invalid-feedback>
        </b-input-group>
        <b-input-group class="p-2">
          <b-input-group-prepend is-text>
            <font-awesome-icon :icon="['fas', 'key']"></font-awesome-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="password"
            :state="passwordState"
            v-on:keyup.enter="submit"
            placeholder="Password"
            type="password"
          ></b-form-input>
          <b-form-invalid-feedback v-html="passwordFeedback">
          </b-form-invalid-feedback>
        </b-input-group>
        <div class="p-2 mt-2">
          <b-button block variant="primary" @click="submit">Login</b-button>
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
  name: "LoginCard",
  data: function() {
    return {
      username: "",
      password: "",
      submitted: false
    };
  },
  watch: {
    username: function() {
      this.submitted = false;
    },
    password: function() {
      this.submitted = false;
    }
  },
  computed: {
    usernameState: function() {
      return !this.submitted ? null : this.username.length >= 4;
    },
    passwordState: function() {
      return !this.submitted ? null : this.password.length >= 8;
    },
    usernameFeedback: function() {
      if (this.username.length === 0) {
        return "Please enter your username";
      } else if (!this.usernameState) {
        return "Valid usernames have at least 4 characters";
      } else {
        return "";
      }
    },
    passwordFeedback: function() {
      if (this.password.length === 0) {
        return "Please enter your password";
      } else if (!this.passwordState) {
        return "Valid passwords have at least 8 characters";
      } else {
        return "";
      }
    }
  },
  methods: {
    submit: function() {
      this.submitted = true;
      if (this.usernameState && this.passwordState) {
        console.log("Submitting form...");

        const targetUrl = process.env.VUE_APP_API_URL + "/login";
        this.$http
          .post(targetUrl, {
            username: this.username,
            password: this.password
          })
          .then(res => {
            this.$store.dispatch("updateUser", res.data.user);
            console.log(`response: ${res.data.message}`);
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            console.log(err);
          });

        this.username = "";
        this.password = "";
        this.submitted = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
  height: 325px;
  width: 350px;
}

.card-footer {
  text-align: center;
}

.input-group-text {
  min-width: 42px;
}
</style>
