<template>
  <div>
    <div class="form-groups">
      <label for="">Email</label>
      <input
        type="email"
        placeholder="Type your email"
        @blur="sttError = true"
        v-model.trim="$v.email.$model"
        :class="{ 'form-groups--error': $v.email.$error }"
      />
    </div>
    <!-- validate email -->
    <div v-if="sttError" class="err">
      <div class="error" v-if="!$v.email.required">Field is required</div>
      <div class="error" v-if="!$v.email.email">Email must be valid</div>
    </div>
    <!-- validate email -->
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  props: {
    statusErr: {
      type: Boolean,
    },
  },
  data() {
    return {
      email: "",
      sttError: false,
    };
  },
  watch: {
    email() {
      this.$emit("email", this.email);
    },
    statusErr() {
      this.sttError = true;
    },
  },
  validations: {
    email: {
      required,
      email,
    },
  },
};
</script>

<style></style>
