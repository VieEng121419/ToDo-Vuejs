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
import { required, minValue } from "vuelidate/lib/validators";
import TextBase from "../TextBase.vue";
export default {
  components: { TextBase },
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

  validations: {
    value: {
      required,
      minValue: minValue(10),
    },
  },
};
</script>

<style></style>
