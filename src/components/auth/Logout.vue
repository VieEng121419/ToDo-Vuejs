<template>
  <div class="popup__container">
    <div class="popup__container" v-if="isShowPopUp">
      <div class="modal-wrapper">
        <img class="modal-img" src="@/assets/check.png" alt="check" />
        <h2 class="modal-title">{{ message }}</h2>
        <div class="modal-buttons">
          <button
            class="modal-button"
            style="margin-right: 20px;"
            @click="confirm"
          >
            Yes
          </button>
          <button class="modal-button" @click="back">No</button>
        </div>
      </div>
      <div class="popup__fill"></div>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "../layouts/Loading.vue";
import { mapActions } from "vuex";
export default {
  components: { Loading },
  data() {
    return {
      isLoading: false,
      isShowPopUp: true,
      message: "",
    };
  },
  computed: {
    errorText() {
      return this.$store.state.account.error;
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
        this.$router.push({ name: "todo" });
      }
    },
  },
  methods: {
    ...mapActions({ logout: "account/logout/logoutUser" }),
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
    confirm() {
      this.isLoading = true;
      this.isShowPopUp = false;
      this.logout();
    },
    back() {
      this.$router.push({ name: "todo" });
    },
  },
  mounted() {
    this.message = "Do you want to log out?";
  },
};
</script>

<style lang="scss"></style>
