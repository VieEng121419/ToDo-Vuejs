<template>
  <div>
    <div class="form-groups">
      <TextBase component="label" size="sm" weight="bold">{{ label }}</TextBase>
      <input
        type="password"
        placeholder="Type your password"
        @blur="sttError = true"
        v-model.trim="password"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    valuePassword: {
      type: String,
    },
  },
  data() {
    return {
      password: "",
      isPassword: true,
    };
  },
  watch: {
    password() {
      this.$emit("input", this.password);
    },
  },
  created() {
    if (this.label != "Password") this.isPassword = false;
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  padding: 15px 1em;
  border: none !important;
  background: #f4f8f7;
  border-radius: 5px !important;
  margin-bottom: 20px;
  font-size: 15px !important;
}
</style>
