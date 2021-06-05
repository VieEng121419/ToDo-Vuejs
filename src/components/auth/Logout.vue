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
