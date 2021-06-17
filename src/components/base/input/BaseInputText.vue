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
import TextBase from "../TextBase.vue";
export default {
  components: { TextBase },
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

<style></style>
