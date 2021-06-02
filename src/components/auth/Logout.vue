<template>
  <div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "../layouts/Loading.vue";
export default {
  components: { Loading },
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    this.$store.dispatch("logoutUser").then((response) => {
      console.log(response);
      this.isLoading = false;
      this.$router.push({ name: "login" });
    });
  },
};
</script>

<style></style>
