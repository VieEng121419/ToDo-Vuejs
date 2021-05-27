<template>
  <div class="container__profile">
    <h3 class="profile__title">My Account</h3>
    <div class="container__form--profile">
      <p class="form__title">USER INFORMATION</p>
      <div v-if="statusEdit" class="form__register">
        <form @submit.prevent="submitEdit">
          <div class="form-groups">
            <label for="">Name</label>
            <input
              type="text"
              placeholder="Type your name"
              v-model.trim="$v.name.$model"
              :class="{ 'form-groups--error': $v.name.$error }"
            />
          </div>
          <!-- validate name -->
          <div class="error" v-if="!$v.name.required">Field is required</div>
          <div class="error" v-if="!$v.name.minLength">
            Name must have at least {{ $v.name.$params.minLength.min }} letters.
          </div>
          <div class="error" v-if="!$v.name.maxLength">
            Name must have at most {{ $v.name.$params.maxLength.max }} letters.
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
          <div class="error" v-if="!$v.email.required">Field is required</div>
          <div class="error" v-if="!$v.email.email">Email must be valid</div>
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
          <div class="error" v-if="!$v.age.minValue">
            Age must have at least {{ $v.age.$params.minValue.min }}
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
          <div class="error" v-if="!$v.password.required">
            Password is required.
          </div>
          <div class="error" v-if="!$v.password.minLength">
            Password must have at least
            {{ $v.password.$params.minLength.min }} letters.
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
          <div class="error" v-if="!$v.confirmPassword.sameAsPassword">
            Passwords must be identical.
          </div>
          <!-- validate confirm -->
          <div class="form-group">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      <div class="user__profile">
        <form @submit.prevent="uploadImg">
          <div class="user__img">
            <img :src="url" alt="avatar" />
            <div class="input__img">
              <input
                type="file"
                name="img"
                id="img"
                class="avatar"
                accept="image/*"
                @change="onFileChange"
              />
              <label for="img">Choose</label>
            </div>
          </div>
          <button
            v-if="isSave"
            style="width: 5%; display: block; margin: 10px auto;"
            type="submit"
          >
            Save
          </button>
        </form>
        <div class="info">
          <div class="info__name">
            <h6>
              {{ name }} <span>, {{ age }}</span>
            </h6>
          </div>
          <div class="info__email">
            <h6>{{ email }}</h6>
          </div>
        </div>
        <div class="button__info">
          <button class="btn" @click="changeEdit()">Edit</button>
        </div>
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
      statusEdit: false,
      Info: {
        name: "",
        email: "",
        age: 0,
        password: "",
        confirmPassword: "",
      },
      name: "",
      email: "",
      age: 0,
      password: "",
      confirmPassword: "",
      url: null,
      isSave: false,
      file: [],
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
    changeEdit() {
      this.statusEdit = !this.statusEdit;
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      const url = e.target.files[0];
      this.url = URL.createObjectURL(url);
      this.isSave = true;
    },
    uploadImg() {
      console.log(this.file);
      // this.$store.dispatch("uploadImg", this.file);
    },
    submitEdit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("fail");
      } else {
        this.$store
          .dispatch("editUser", {
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
            alert("Edit fail");
            console.log(err);
          });
      }
    },
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.age = userInfo.age;
    this.password = userInfo.password;
  },
};
</script>

<style>
.container__profile {
  width: 90%;
  height: auto;
  border: 1px solid #eeee;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
}
.profile__title {
  padding: 20px;
  padding-left: 30px;
}
.container__form--profile {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  background: #f7fafc;
}
.form__title {
  flex: 0 1 100%;
  font-size: 0.75rem;
  padding: 30px;
  padding-left: 30px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #8898aa;
}
.form__register {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 60px;
  padding-right: 60px;
  flex: 1 0 60%;
}
form {
  width: 100%;
  display: inline-block;
}
.user__profile {
  width: 40%;
  display: flex;
  flex-direction: column;
  float: right;
  padding-right: 60px;
  flex: 1 0 40%;
}
.user__img {
  position: relative;
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}
.user__img::before {
  content: "";
  background: #000;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: all 0.3s;
  z-index: 1;
}
.user__img:hover::before {
  opacity: 0.6;
}
.user__img img {
  width: 100%;
  height: auto;
  position: relative;
}
.user__img .input__img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.user__img .input__img .avatar {
  display: none;
}
.user__img .input__img label {
  display: none;
  color: #f7fafc;
}
.user__img:hover .input__img label {
  padding: 20px;
  display: block;
  cursor: pointer;
}
.info {
  text-align: center;
}
.info .info__name {
  line-height: 1.5;
  margin-bottom: 7px;
  margin-top: 20px;
}
.button__info {
  display: block;
  margin: 20px auto;
}
.button__info .btn {
  padding: 10px 30px;
}
</style>
