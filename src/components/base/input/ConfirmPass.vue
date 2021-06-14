<template>
  <div>
    <div class="form-groups">
      <label for="">Confirm Password</label>
      <input
        type="password"
        placeholder="Type your password again"
        @blur="sttError = true"
        :class="{ 'form-groups--error': $v.confirmPassword.$error }"
        v-model.trim="$v.confirmPassword.$model"
      />
    </div>
    <!-- validate confirm -->
    <div v-if="sttError" class="err">
      <div class="error" v-if="!$v.confirmPassword.sameAsPassword">
        Passwords must be identical.
      </div>
    </div>
    <!-- validate confirm -->
  </div>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
export default {
  props: {
    password: {
      type: String,
      required: true,
    },
    statusErr: {
      type: Boolean,
    },
  },
  data() {
    return {
      confirmPassword: "",
      sttError: false,
    };
  },
  watch: {
    confirmPassword() {
      this.$emit("confirmPassword", this.confirmPassword);
    },
    statusErr() {
      this.sttError = true;
    },
  },
  validations: {
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>

<style></style>
