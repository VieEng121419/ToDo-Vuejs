<template>
  <div class="container__profile--page">
    <popup></popup>
    <div class="container__profile">
      <loading v-if="isEdit"></loading>
      <h3 class="profile__title">My Account</h3>
      <div class="container__form--profile">
        <p class="form__title">USER INFORMATION</p>

        <div class="user__profile">
          <form @submit.prevent="uploadImg">
            <div class="user__img">
              <loading v-if="isLoading"></loading>
              <img :src="url" />
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
              style="width: 23%; display: block; margin: 10px auto;"
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
        </div>
        <div class="form__edit">
          <form @submit.prevent="submitEdit">
            <name
              @name="name = $event"
              :statusErr="statusErr"
              :nameUser="name"
            />
            <div class="form-groups">
              <label for="">Email</label>
              <input
                type="email"
                placeholder="Type your email"
                v-model.trim="$v.email.$model"
                disabled
              />
            </div>
            <age @age="age = $event" :statusErr="statusErr" :ageUser="age" />
            <div class="form-group">
              <button type="submit">Save</button>
            </div>
          </form>
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
import Name from "../base/input/Name.vue";
import Age from "../base/input/Age.vue";
export default {
  components: {
    Loading,
    Name,
    Age,
  },
  data() {
    return {
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
    alertEdit() {
      return this.$store.state.profile.edit.editAlert;
    },
    updateAva() {
      return this.$store.state.profile.avatar.updateAva.avaAlert;
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
        this.isEdit = false;
        this.isLoading = false;
      }
    },
    alertEdit() {
      if (this.alertEdit) {
        this.isEdit = false;
        this.message = "Edit Successfully!";
        this.showModal();
        this.$store.state.profile.edit.editAlert = false;
      }
    },
    updateAva() {
      if (this.updateAva) {
        this.isEdit = false;
        this.message = "Avatar Updated!";
        this.showModal();
        this.$store.state.profile.avatar.updateAva.avaAlert = false;
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
  mounted() {
    if (this.$store.state.profile.avatar.updateAva.avaAlert === true) {
      this.isEdit = false;
      this.message = "Avatar Updated!";
      this.showModal();
      this.$store.state.profile.avatar.updateAva.avaAlert = false;
    }
    if (this.$store.state.profile.edit.editAlert === true) {
      this.message = "Edit Successfully!";
      this.showModal();
      this.$store.state.profile.edit.editAlert = false;
    }
  },
  async created() {
    const userInfo = JSON.parse(localStorage.getItem("todo")).auth.user;
    this.id = userInfo._id;
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.age = userInfo.age;
    this.isLoading = true;
    await this.getImageUser(this.id);
    this.url = await `https://api-nodejs-todolist.herokuapp.com/${
      JSON.parse(localStorage.getItem("todo")).auth.imgUrl
    }`;
  },
};
</script>

<style></style>
