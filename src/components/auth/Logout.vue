<template>
  <div>
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
      isLoading: true,
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
  },
  created() {
    this.isLoading = true;
    this.logout();
  },
};
</script>

<style></style>
