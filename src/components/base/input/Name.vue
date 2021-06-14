<template>
  <div class="form-groups">
    <div class="form-groups">
      <label for="">Name</label>
      <input
        type="text"
        placeholder="Type your name"
        @blur="sttError = true"
        v-model.trim="$v.name.$model"
        :class="{ 'form-groups--error': $v.name.$error }"
      />
    </div>
    <!-- validate name -->
    <div v-if="sttError" class="err">
      <div class="error" v-if="!$v.name.required">Field is required</div>
      <div class="error" v-if="!$v.name.minLength">
        Name must have at least
        {{ $v.name.$params.minLength.min }} letters.
      </div>
      <div class="error" v-if="!$v.name.maxLength">
        Name must have at most
        {{ $v.name.$params.maxLength.max }} letters.
      </div>
    </div>
    <!-- validate name -->
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  props: {
    statusErr: {
      type: Boolean,
    },
  },
  data() {
    return {
      name: "",
      sttError: false,
    };
  },

  watch: {
    name() {
      this.$emit("name", this.name);
    },
    statusErr() {
      this.sttError = true;
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(128),
    },
  },
  methods: {},
};
</script>

<style></style>
