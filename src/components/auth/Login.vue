<template>
  <div class="login__container">
    <popup></popup>
    <div class="container">
      <div class="title__register">
        <h1>LOGIN</h1>
      </div>
      <div class="form__register">
        <form class="form" @submit.prevent="submiLogin">
          <BaseInputText
            label="Email"
            @input="email = $event"
            @blur="statusErr = true"
          ></BaseInputText>
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.email.required">Field is required</div>
            <div class="error" v-if="!$v.email.email">Email must be valid</div>
          </div>

          <BaseInputPassword
            label="Password"
            @input="password = $event"
            @blur="statusErr = true"
          ></BaseInputPassword>
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.password.required">
              Password is required.
            </div>
            <div class="error" v-if="!$v.password.minLength">
              Password must have at least
              {{ $v.password.$params.minLength.min }} letters.
            </div>
          </div>

          <div class="form-group">
            <Button typeButton="submit" type="form">Login</Button>
          </div>
        </form>
      </div>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import Loading from "../layouts/Loading.vue";
import BaseInputPassword from "../base/input/BaseInputPassword.vue";
import BaseInputText from "../base/input/BaseInputText.vue";
import Button from "../base/BaseButton.vue";
import { mapActions } from "vuex";
export default {
  components: { Loading, Button, BaseInputPassword, BaseInputText },
  data() {
    return {
      email: "",
      password: "",
      statusErr: false,
      message: "",
      check: true,
      isLoading: false,
      title: "Login",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
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
      return this.$store.state.account.errorData;
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
      this.$notify({
        group: "success",
        title: "Logout Successfully!",
      });
      this.$store.state.account.logout.outAlert = false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
