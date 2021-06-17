<template>
  <div class="form-groups">
    <div class="form-groups">
      <TextBase component="label" size="sm" weight="bold">{{ label }}</TextBase>
      <input
        type="text"
        placeholder="Type your name"
        v-model.trim.lazy.number="value"
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
    ageUser: {
      type: Number,
    },
  },
  data() {
    return {
      value: 0,
    };
  },
  watch: {
    value() {
      if (this.value === "") {
        this.value = 0;
      } else this.$emit("input", this.value);
    },
  },
  created() {
    this.value = this.ageUser;
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
