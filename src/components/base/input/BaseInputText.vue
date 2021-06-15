<template>
  <div class="form-groups">
    <div class="form-groups">
      <TextBase component="label">{{ label }}</TextBase>
      <input
        type="text"
        :placeholder="'Type your ' + [[label]]"
        @blur="sttError = true"
        v-model.trim="$v.value.$model"
      />
    </div>
    <!-- validate name -->
    <div v-if="isName">
      <div v-if="sttError" class="err">
        <div class="error" v-if="!$v.value.required">Field is required</div>
        <div class="error" v-if="!$v.value.minLength">
          Name must have at least
          {{ $v.value.$params.minLength.min }} letters.
        </div>
        <div class="error" v-if="!$v.value.maxLength">
          Name must have at most
          {{ $v.value.$params.maxLength.max }} letters.
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="sttError" class="err">
        <div class="error" v-if="!$v.value.required">Field is required</div>
        <div class="error" v-if="!$v.value.email">Email must be valid</div>
      </div>
    </div>

    <!-- validate name -->
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
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
    nameUser: {
      type: String,
    },
  },
  data() {
    return {
      value: "",
      sttError: false,
      isName: true,
    };
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
    statusErr() {
      this.sttError = true;
    },
  },
  validations: {
    value: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(128),
      email,
    },
  },
  created() {
    this.label != "Name" ? (this.isName = false) : (this.value = this.nameUser);
  },
};
</script>

<style></style>
