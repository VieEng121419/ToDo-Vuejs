<template>
  <div class="container">
    <div class="title__register">
      <h1>Register</h1>
    </div>
    <div class="form__register">
      <form @submit.prevent="submitRegister">
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
            Name must have at least {{ $v.name.$params.minLength.min }} letters.
          </div>
          <div class="error" v-if="!$v.name.maxLength">
            Name must have at most {{ $v.name.$params.maxLength.max }} letters.
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
      statusNotifi: false,
      statusErr: false,
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
            alert("Register fail");
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
.container {
  width: 40%;
  min-height: 50vh;
  border: 1px solid #eeee;
  background: #fff;
  margin-top: 55px;
}
.title__register {
  padding: 40px;
  text-align: center;
}
.form__register {
  display: flex;
  justify-content: center;
}
h1 {
  color: #000;
}
form {
  width: 90%;
}
.form-groups {
  width: 100%;
}
.form-groups--error {
  border: 1px solid #f57f6c;
}
label {
  display: block;
  color: #000;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 0.75em 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}
button {
  cursor: pointer;
  display: block;
  height: auto;
  width: 100%;
  font-size: 13px;
  font-weight: 700;
  box-sizing: border-box;
  background: #e75b35;
  transition: 0.3s;
  color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  border: none;
  padding: 10px;
  margin-bottom: 20px;
}
button:hover {
  background: #f17958;
}
.error {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 1;
  margin-left: 1px;
  margin-top: -0.5rem;
  margin-bottom: 0.9375rem;
}
</style>
