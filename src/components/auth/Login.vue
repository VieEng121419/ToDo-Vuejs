<template>
  <div class="container">
    <div class="title__register">
      <h1>Login</h1>
    </div>
    <div class="form__register">
      <form @submit.prevent="submiLogin">
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

<style>
.container {
  width: 40%;
  height: auto;
  border: 1px solid #eeee;
  background: #fff;
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
.form-group {
  width: 100%;
}
.form-group--error {
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
