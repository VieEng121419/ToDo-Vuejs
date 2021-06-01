<template>
  <div class="container__profile">
    <popup></popup>
    <h3 class="profile__title">My Account</h3>
    <div class="container__form--profile">
      <p class="form__title">USER INFORMATION</p>
      <div v-if="statusEdit" class="form__edit">
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
                ref="file"
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
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      statusEdit: false,
      Info: {
        name: "",
        age: 0,
      },
      id: "",
      name: "",
      age: 0,
      url: null,
      isSave: false,
      file: "",
      image: "",
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
    age: {
      required,
      minValue: minValue(10),
    },
  },
  watch: {
    url: function() {},
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
    changeEdit() {
      this.statusEdit = !this.statusEdit;
    },
    onFileChange() {
      this.file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.file);
      this.isSave = true;
    },
    uploadImg() {
      this.$store
        .dispatch("uploadImg", this.file)
        .then(async (response) => {
          console.log(response);
          // this.message = "Avatar Updated!";
          // await this.showModal();
          await this.$router.push({ name: "todo" });
        })
        .catch((err) => {
          alert(err.response.data.error);
          this.check = !this.check;
          this.message = "Avatar Update Fail!";
          this.showModal();
        });
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
    getAvatar() {
      this.$store
        .dispatch("getAvatar", this.id)
        .then((res) => {
          this.url = res.config.url;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    this.id = userInfo._id;
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.age = userInfo.age;
    this.password = userInfo.password;
    this.getAvatar();
  },
  mounted() {
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
};
</script>

<style></style>
