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
            @blur="statusErr = true"
          ></BaseInputText>
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.name.required">Field is required</div>
            <div class="error" v-if="!$v.name.minLength">
              Name must have at least
              {{ $v.name.$params.minLength.min }} letters.
            </div>
            <div class="error" v-if="!$v.name.maxLength">
              Name must have at most
              {{ $v.name.$params.maxLength.max }} letters.
            </div>
          </div>

          <BaseInputText
            label="Email"
            @input="email = $event"
            @blur="statusErr = true"
          ></BaseInputText>
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.email.required">Field is required</div>
            <div class="error" v-if="!$v.email.email">Email must be valid</div>
          </div>

          <BaseInputNumber
            label="Age"
            @input="age = $event"
            @blur="statusErr = true"
          ></BaseInputNumber>
          <!-- validate number-->
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.age.minValue">
              Age must have at least {{ $v.age.$params.minValue.min }}
            </div>
          </div>
          <!-- validate number-->

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

          <BaseInputPassword
            label="Confirm Password"
            @input="confirmPassword = $event"
            :valuePassword="password"
            @blur="statusErr = true"
          />
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.confirmPassword.sameAsPassword">
              Passwords must be identical.
            </div>
          </div>

          <div class="form-group">
            <Button typeButton="submit" type="form">Register</Button>
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
