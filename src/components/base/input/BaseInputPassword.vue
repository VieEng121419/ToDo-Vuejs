<template>
  <div>
    <div class="form-groups">
      <TextBase component="label" size="sm" weight="bold">{{ label }}</TextBase>
      <input
        type="password"
        placeholder="Type your password"
        @blur="sttError = true"
        :class="{ 'form-groups--error': $v.password.$error }"
        v-model.trim="$v.password.$model"
      />
    </div>
    <!-- validate password -->

    <!-- validate password -->
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
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
    valuePassword: {
      type: String,
    },
  },
  data() {
    return {
      password: "",
      sttError: false,
      isPassword: true,
    };
  },
  watch: {
    password() {
      this.$emit("input", this.password);
    },
    statusErr() {
      this.sttError = true;
    },
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs("valuePassword"),
    },
  },
  created() {
    if (this.label != "Password") this.isPassword = false;
  },
};
</script>

<style></style>
