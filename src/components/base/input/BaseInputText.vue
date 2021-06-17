<template>
  <div class="form-groups">
    <div class="form-groups">
      <TextBase component="label" size="sm" weight="bold">{{ label }}</TextBase>
      <input
        type="text"
        :placeholder="'Type your ' + [[label]]"
        v-model="value"
        @blur="$emit('blur', $event)"
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
    nameUser: {
      type: String,
    },
  },
  data() {
    return {
      isName: true,
      value: "",
    };
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
  },
  created() {
    this.label != "Name" ? (this.isName = false) : (this.value = this.nameUser);
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
