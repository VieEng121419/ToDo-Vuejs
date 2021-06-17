<template>
  <component :is="component" :class="classes" @click="$emit('click', $event)">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    component: {
      default: "p",
    },
    variant: {
      type: String,
    },
    ellipsis: {},
    size: {
      type: String,
      default: "md",
    },
    color: {
      type: String,
      default: "text-black",
    },
    weight: {
      type: String,
      default: "normal",
    },
  },
  computed: {
    classes() {
      return {
        [`style-${this.component}`]: true,
        [`style-${this.variant}`]: true,
        [`font-${this.weight}`]: true,
        [`font-${this.size}`]: true,
        [`font-${this.color}`]: true,
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
  font-size: 50px !important  ;
}
.style-h3 {
  font-size: 30px !important  ;
}
.style-h6 {
  line-height: 20px;
}
.style-label {
  display: block;
  margin-bottom: 5px;
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
.font-xs {
  font-size: 10px;
}
.font-sm {
  font-size: 13px;
}
.font-md {
  font-size: 15px;
}
.font-lg {
  font-size: 30px;
}
.font-xl {
  font-size: 50px;
}
.font-text-white {
  color: #fff;
}
.font-bold {
  font-weight: bold;
}
.font-light {
  font-weight: lighter;
}
.font-normal {
  font-weight: normal;
}
</style>
