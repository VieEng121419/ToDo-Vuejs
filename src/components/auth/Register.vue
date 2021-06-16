<template>
  <div class="login__container">
    <div class="container">
      <div class="title__register">
        <h1>Register</h1>
      </div>
      <div class="form__register">
        <form class="form" @submit.prevent="submitRegister">
          <BaseInputText
            label="Name"
            @input="name = $event"
            :statusErr="statusErr"
          ></BaseInputText>
          <BaseInputText
            label="Email"
            @input="email = $event"
            :statusErr="statusErr"
          ></BaseInputText>
          <BaseInputNumber
            label="Age"
            @input="age = $event"
            :statusErr="statusErr"
          ></BaseInputNumber>
          <BaseInputPassword
            label="Password"
            @input="password = $event"
            :statusErr="statusErr"
          ></BaseInputPassword>
          <BaseInputPassword
            label="Confirm Password"
            @input="confirmPassword = $event"
            :statusErr="statusErr"
            :valuePassword="password"
          />
          <div class="form-group">
            <Button typeButton="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  minValue,
  sameAs,
  email,
} from "vuelidate/lib/validators";
import Loading from "../layouts/Loading.vue";
import BaseInputText from "../base/input/BaseInputText.vue";
import BaseInputNumber from "../base/input/BaseInputNumber.vue";
import BaseInputPassword from "../base/input/BaseInputPassword.vue";
import Button from "../base/BaseButton.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Loading,
    Button,
    BaseInputText,
    BaseInputNumber,
    BaseInputPassword,
  },
  data() {
    return {
      name: "",
      email: "",
      age: 0,
      password: "",
      statusErr: false,
      confirmPassword: "",
      message: "",
      check: true,
      isLoading: false,
      title: "Register",
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(128),
    },
    email: {
      required,
      email,
    },
    age: {
      required,
      minValue: minValue(10),
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    ...mapActions({ addUser: "account/register/addUser" }),
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
    submitRegister() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.statusErr = true;
      } else {
        this.isLoading = true;
        this.addUser({
          name: this.name,
          email: this.email,
          age: this.age,
          password: this.password,
        });
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
};
</script>

<style scoped></style>
