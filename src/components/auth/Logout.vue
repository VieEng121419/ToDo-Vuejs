<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("logoutUser").then((response) => {
      console.log(response);
      this.$router.push({ name: "login" });
    });
  },
};
</script>

<style></style>
