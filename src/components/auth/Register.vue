<template>
  <div class="login__container">
    <div class="container">
      <div class="title__register">
        <h1>Register</h1>
      </div>
      <div class="form__register">
        <form class="form" @submit.prevent="submitRegister">
          <name @name="name = $event" :statusErr="statusErr" />
          <email @email="email = $event" :statusErr="statusErr" />
          <age @age="age = $event" :statusErr="statusErr" />
          <password @password="password = $event" :statusErr="statusErr" />
          <confirm-pass
            @confirmPassword="confirmPassword = $event"
            :statusErr="statusErr"
            :password="password"
          />
          <div class="form-groups">
            <button type="submit">Register</button>
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
import Name from "../base/input/Name.vue";
import Email from "../base/input/Email.vue";
import Age from "../base/input/Age.vue";
import Password from "../base/input/Password.vue";
import ConfirmPass from "../base/input/ConfirmPass.vue";
import { mapActions } from "vuex";
export default {
  components: { Loading, Name, Email, Age, Password, ConfirmPass },
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
