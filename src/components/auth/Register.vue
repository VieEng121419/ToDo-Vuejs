<template>
  <div class="login__container">
    <div class="container">
      <div class="title__register">
        <h1>Register</h1>
      </div>
      <div class="form__register">
        <form class="form" @submit.prevent="submitRegister">
          <div class="form-groups">
            <label for="">Name</label>
            <input
              type="text"
              placeholder="Type your name"
              @blur="statusErr = true"
              v-model.trim="$v.name.$model"
              :class="{ 'form-groups--error': $v.name.$error }"
            />
          </div>
          <!-- validate name -->
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
          <!-- validate name -->

          <div class="form-groups">
            <label for="">Email</label>
            <input
              type="email"
              placeholder="Type your email"
              v-model.trim="$v.email.$model"
              :class="{ 'form-groups--error': $v.email.$error }"
            />
          </div>
          <!-- validate email -->
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.email.required">Field is required</div>
            <div class="error" v-if="!$v.email.email">Email must be valid</div>
          </div>
          <!-- validate email -->

          <div class="form-groups">
            <label for="">Age</label>
            <input
              type="text"
              placeholder="Type your age"
              :class="{ 'form-groups--error': $v.age.$error }"
              v-model.trim.lazy="$v.age.$model"
            />
          </div>
          <!-- validate age -->
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.age.minValue">
              Age must have at least {{ $v.age.$params.minValue.min }}
            </div>
          </div>
          <!-- validate age -->
          <div class="form-groups">
            <label for="">Password</label>
            <input
              type="password"
              placeholder="Type your password"
              :class="{ 'form-groups--error': $v.password.$error }"
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
          <div class="form-groups">
            <label for="">Confirm Password</label>
            <input
              type="password"
              placeholder="Type your password again"
              :class="{ 'form-groups--error': $v.confirmPassword.$error }"
              v-model.trim="$v.confirmPassword.$model"
            />
          </div>
          <!-- validate confirm -->
          <div v-if="statusErr" class="err">
            <div class="error" v-if="!$v.confirmPassword.sameAsPassword">
              Passwords must be identical.
            </div>
          </div>
          <!-- validate confirm -->
          <div class="form-groups">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
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

export default {
  data() {
    return {
      posts: {
        name: "",
        email: "",
        password: "",
        age: 0,
      },
      name: "",
      email: "",
      age: 0,
      password: "",
      confirmPassword: "",
      message: "",
      check: true,
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
      console.log("submit");
      this.$v.$touch();
      if (this.$v.$invalid) {
        //
        console.log("fail");
      } else {
        this.$store
          .dispatch("addUser", {
            name: this.name,
            email: this.email,
            age: this.age,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
            this.$router.push({ name: "todo" });
          })
          .catch((err) => {
            console.log(err);
            this.check = !this.check;
            this.message = "Register Fail!";
            this.showModal();
          });
      }
    },
  },
};
</script>

<style scoped></style>
