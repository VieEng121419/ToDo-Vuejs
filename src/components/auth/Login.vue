<template>
  <div class="login__container">
    <popup></popup>
    <div class="container">
      <div class="title__register">
        <h1>LOGIN</h1>
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
              @blur="statusErr = true"
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
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import Loading from "../layouts/Loading.vue";
import { mapActions } from "vuex";
export default {
  components: { Loading },
  data() {
    return {
      email: "",
      password: "",
      statusErr: false,
      message: "",
      check: true,
      isLoading: false,
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
    showModal() {
      const params = {
        text: this.message,
        check: this.check,
        onConfirm: () => {
          return this.alertFunc();
        },
      };
      this.$modal.show(params);
    },
    ...mapActions({ loginUser: "account/login/loginUser" }),
    submiLogin() {
      console.log("submit");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.statusErr = true;
      } else {
        this.isLoading = true;
        this.loginUser({ email: this.email, password: this.password });
      }
    },
  },
  computed: {
    errorText() {
      return this.$store.state.account.error;
    },
  },
  watch: {
    errorText() {
      if (this.errorText !== "") {
        this.$notify({
          group: "error",
          title: this.errorText,
        });
        this.isLoading = false;
      }
    },
  },
  mounted() {
    if (this.$store.state.account.logout.outAlert === true) {
      this.message = "Logout Successfully!";
      this.showModal();
      this.$store.state.account.logout.outAlert = false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
