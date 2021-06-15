<template>
  <div>
    <div class="form-groups">
      <TextBase component="label">{{ label }}</TextBase>
      <input
        type="password"
        placeholder="Type your password"
        @blur="sttError = true"
        :class="{ 'form-groups--error': $v.password.$error }"
        v-model.trim="$v.password.$model"
      />
    </div>
    <!-- validate password -->
    <div v-if="isPassword">
      <div v-if="sttError" class="err">
        <div class="error" v-if="!$v.password.required">
          Password is required.
        </div>
        <div class="error" v-if="!$v.password.minLength">
          Password must have at least
          {{ $v.password.$params.minLength.min }} letters.
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="sttError" class="err">
        <div class="error" v-if="!$v.password.sameAsPassword">
          Passwords must be identical.
        </div>
      </div>
    </div>
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
