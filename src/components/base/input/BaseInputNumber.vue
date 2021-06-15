<template>
  <div class="form-groups">
    <div class="form-groups">
      <TextBase component="label">{{ label }}</TextBase>
      <input
        type="text"
        placeholder="Type your name"
        @blur="sttError = true"
        v-model.trim.lazy.number="$v.value.$model"
      />
    </div>
    <!-- validate number-->
    <div v-if="sttError" class="err">
      <div class="error" v-if="!$v.value.minValue">
        {{ label }} must have at least {{ $v.value.$params.minValue.min }}
      </div>
    </div>
    <!-- validate number-->
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
    statusErr: {
      type: Boolean,
    },
    ageUser: {
      type: Number,
    },
  },
  data() {
    return {
      value: 0,
      sttError: false,
    };
  },
  watch: {
    value() {
      if (this.value === "") {
        this.value = 0;
      } else this.$emit("input", this.value);
    },
    statusErr() {
      this.sttError = true;
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
