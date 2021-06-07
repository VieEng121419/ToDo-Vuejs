<template>
  <div class="container__profile">
    <popup></popup>
    <loading v-if="isEdit"></loading>
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
              @blur="statusErr = true"
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
              disabled
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
              @blur="statusErr = true"
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
            <loading v-if="isLoading"></loading>
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
  email,
  minValue,
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import Loading from "../layouts/Loading";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      statusEdit: false,
      Info: {},
      id: "",
      name: "",
      email: "",
      age: 0,
      url: "",
      isSave: false,
      file: "",
      image: "",
      message: "",
      check: true,
      isLoading: true,
      isEdit: false,
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
  },
  computed: {
    errorText() {
      return this.$store.state.profile.error;
    },
    errorContent() {
      return this.$store.state.profile.errorData;
    },
  },
  watch: {
    url() {
      this.isLoading = false;
    },
    errorText() {
      if (this.errorText !== "") {
        if (this.errorContent !== "") {
          this.$notify({
            group: "error",
            title: this.errorContent,
          });
        } else {
          this.$notify({
            group: "error",
            title: this.errorText,
          });
        }
        this.$notify({
          group: "error",
          title: this.errorText,
        });
        this.isEdit = false;
        this.isLoading = false;
      }
    },
  },
  methods: {
    ...mapActions({
      editUser: "profile/edit/editUser",
      getImageUser: "profile/avatar/getAva/getAvatar",
      uploadAva: "profile/avatar/updateAva/uploadImg",
    }),
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
      this.isEdit = true;
      this.uploadAva(this.file);
    },
    submitEdit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.statusErr = true;
      } else {
        this.isEdit = true;
        this.editUser({ name: this.name, age: this.age });
      }
    },
  },

  created() {
    const userInfo = JSON.parse(localStorage.getItem("todo")).auth.user;
    this.id = userInfo._id;
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.age = userInfo.age;
    this.isLoading = true;
    this.getImageUser(this.id);
  },
  mounted() {
    this.url = `https://api-nodejs-todolist.herokuapp.com/${localStorage.getItem(
      "url"
    )}`;
  },
};
</script>

<style></style>
