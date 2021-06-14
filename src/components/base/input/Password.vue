<template>
  <div>
    <div class="form-groups">
      <label for="">Password</label>
      <input
        type="password"
        placeholder="Type your password"
        @blur="sttError = true"
        :class="{ 'form-groups--error': $v.password.$error }"
        v-model.trim="$v.password.$model"
      />
    </div>
    <!-- validate password -->
    <div v-if="sttError" class="err">
      <div class="error" v-if="!$v.password.required">
        Password is required.
      </div>
      <div class="error" v-if="!$v.password.minLength">
        Password must have at least
        {{ $v.password.$params.minLength.min }} letters.
      </div>
    </div>
    <!-- validate password -->
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  props: {
    statusErr: {
      type: Boolean,
    },
  },
  data() {
    return {
      password: "",
      sttError: false,
    };
  },
  watch: {
    password() {
      this.$emit("password", this.password);
    },
    statusErr() {
      this.sttError = true;
    },
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
    },
  },
};
</script>

<style></style>
