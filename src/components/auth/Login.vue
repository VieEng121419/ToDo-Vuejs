<template>
  <div class="container">
    <div class="title__register">
      <h1>Login</h1>
    </div>
    <div class="form__register">
      <form class="form" @submit.prevent="submiLogin">
        <div class="form-group">
          <label for="">Email</label>
          <input
            type="email"
            placeholder="Type your email"
            @blur="statusErr = true"
            v-model.trim="$v.email.$model"
            :class="{ 'form-group--error': $v.email.$error }"
          />
        </div>
        <!-- validate email -->
        <div v-if="statusErr" class="err">
          <div class="error" v-if="!$v.email.required">Field is required</div>
          <div class="error" v-if="!$v.email.email">Email must be valid</div>
        </div>
        <!-- validate email -->
        <div class="form-group">
          <label for="">Password</label>
          <input
            type="password"
            placeholder="Type your password"
            :class="{ 'form-group--error': $v.password.$error }"
            v-model.trim="$v.password.$model"
          />
        </div>
        <!-- validate password -->
        <div v-if="statusErr" class="err">
          <div class="error" v-if="!$v.password.required">
            Password is required.
          </div>
          <div class="error" v-if="!$v.password.minLength">
            Password must have at least
            {{ $v.password.$params.minLength.min }} letters.
          </div>
        </div>
        <!-- validate password -->
        <div class="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      statusErr: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(5),
    },
  },
  methods: {
    submiLogin() {
      console.log("submit");
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("fail");
      } else {
        this.$store
          .dispatch("loginUser", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
            this.$router.push({ name: "todo" });
          })
          .catch((err) => {
            console.log(err);
            alert("Login fail");
          });
      }
    },
  },
  created() {
    if (this.$store.state.outAlert === true) {
      alert("Logout Successfully");
      this.$store.state.outAlert = false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
