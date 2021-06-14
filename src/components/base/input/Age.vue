<template>
  <div>
    <div class="form-groups">
      <label for="">Age</label>
      <input
        type="text"
        placeholder="Type your age"
        @blur="sttError = true"
        :class="{ 'form-groups--error': $v.age.$error }"
        v-model.trim.lazy.number="$v.age.$model"
      />
    </div>
    <!-- validate age -->
    <div v-if="sttError" class="err">
      <div class="error" v-if="!$v.age.minValue">
        Age must have at least {{ $v.age.$params.minValue.min }}
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: {
    statusErr: {
      type: Boolean,
    },
    ageUser: {
      type: Number,
    },
  },
  data() {
    return {
      sttError: false,
      age: 0,
    };
  },
  watch: {
    age() {
      if (this.age === "") {
        this.age = 0;
      } else this.$emit("age", this.age);
    },
    statusErr() {
      this.sttError = true;
    },
  },
  created() {
    this.age = this.ageUser;
  },
  validations: {
    age: {
      required,
      minValue: minValue(10),
    },
  },
};
</script>

<style></style>
