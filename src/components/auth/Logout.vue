<template>
  <div class="popup__container">
    <div class="popup__container" v-if="isShowPopUp">
      <div class="modal-wrapper">
        <img class="modal-img" src="@/assets/check.png" alt="check" />
        <h2 class="modal-title">{{ message }}</h2>
        <div class="modal-buttons">
          <Button type="confirm" class="mr" @click="confirm">
            Yes
          </Button>
          <Button type="confirm" @click="back">No</Button>
        </div>
      </div>
      <div class="popup__fill"></div>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "../layouts/Loading.vue";
import Button from "../base/BaseButton.vue";
import { mapActions } from "vuex";
export default {
  components: { Loading, Button },
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

<style lang="scss" scoped>
.mr {
  margin-right: 20px;
}
</style>
