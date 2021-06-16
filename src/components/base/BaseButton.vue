<template>
  <button :type="typeButton">
    <TextBase component="span" variant="form"> <slot /> </TextBase>
  </button>
</template>

<script>
import TextBase from "./TextBase.vue";
export default {
  components: {
    TextBase,
  },
  props: {
    type: {
      type: String,
    },
    typeButton: {
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style></style>
