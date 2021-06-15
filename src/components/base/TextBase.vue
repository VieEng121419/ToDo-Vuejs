<template>
  <component :is="component" @click="$emit('click', $event)">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    component: {},
  },
};
</script>

<style></style>
