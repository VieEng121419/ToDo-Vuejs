<template>
  <div class="container__profile--page">
    <popup></popup>
    <div class="container__profile">
      <loading v-if="isEdit"></loading>
      <TextBase component="h3" class="profile__title">{{
        "My Account"
      }}</TextBase>
      <div class="container__form--profile">
        <TextBase component="p" class="form__title">{{
          "USER INFOMATION"
        }}</TextBase>
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
            <div class="button__avatar--container">
              <Button v-if="isSave" typeButton="submit">Save</Button>
            </div>
          </form>
          <div class="info">
            <div class="info__name">
              <TextBase component="h6">{{ name }}, {{ age }}</TextBase>
            </div>
            <div class="info__email">
              <TextBase component="h6">{{ email }}</TextBase>
            </div>
          </div>
        </div>
        <div class="form__edit">
          <form @submit.prevent="submitEdit">
            <BaseInputText
              label="Name"
              @input="name = $event"
              :statusErr="statusErr"
              :nameUser="name"
            ></BaseInputText>
            <div class="form-groups">
              <label for="">Email</label>
              <input v-model="email" disabled />
            </div>
            <BaseInputNumber
              label="Age"
              @input="age = $event"
              :statusErr="statusErr"
              :ageUser="age"
            ></BaseInputNumber>
            <div class="form-group">
              <Button typeButton="submit">Save</Button>
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
import BaseInputText from "../base/input/BaseInputText.vue";
import BaseInputNumber from "../base/input/BaseInputNumber.vue";
import Button from "../base/BaseButton.vue";
import TextBase from "../base/TextBase.vue";
export default {
  components: {
    Loading,
    Button,
    TextBase,
    BaseInputText,
    BaseInputNumber,
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

<style lang="scss" scoped>
.button__avatar--container {
  width: 24%;
  display: block;
  margin: 0 auto;
}
</style>
