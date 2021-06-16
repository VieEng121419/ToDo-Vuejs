<template>
  <component :is="component" :class="classes" @click="$emit('click', $event)">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    component: {},
    variant: {
      type: String,
    },
    ellipsis: {},
  },
  computed: {
    classes() {
      return {
        [`style-${this.component}`]: true,
        [`style-${this.variant}`]: true,
        ellipsis: !!this.ellipsis,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/../src/styles/abstracts/variables";
@import "~/../src/styles/abstracts/mixin";
.style-h1 {
  line-height: 80px;
}
.style-h3 {
  line-height: 20px;
}
.style-h6 {
  line-height: 20px;
}
.style-label {
  line-height: 20px;
}
.style-span {
}
.style-task-description {
  width: 100%;
  font-size: 12px;
  line-height: 20px;
  &.active {
    width: 100%;
    white-space: normal;
  }
  @include respond(largeMobile) {
    width: 95%;
  }
}
.style-form {
  font-size: 15px;
}
.style-nav {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.1rem;
}
.style-filter {
  color: #3ab397;
  font-size: 10px;
}
.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
