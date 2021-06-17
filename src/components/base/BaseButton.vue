<template>
  <button
    :class="classes"
    :type="typeButton"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <TextBase
      component="span"
      variant="form"
      color="text-white"
      size="md"
      weight="bold"
    >
      <slot />
    </TextBase>
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
      default: "default",
    },
    typeButton: {
      type: String,
    },
    disabled: {},
    outline: {},
    loading: {},
  },
  data() {
    return {
      classes: {
        btn: true,
        [`btn-${this.type}`]: true,
        outline: !!this.outline,
        disabled: !!this.disabled,
        loading: !!this.loading,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/../src/styles/abstracts/variables";
@import "~/../src/styles/abstracts/mixin";
.btn {
  cursor: pointer;
  display: block;
  height: auto;
  width: 100%;
  font-weight: 700;
}
.btn-form {
  background: #3ab397;
  transition: 0.3s;
  color: #fff;
  border-radius: 50px;
  border: none;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  &:hover {
    color: #fff;
    background: #3aaf9f;
  }
}
.btn-default {
  width: 100%;
  box-sizing: border-box;
  background: none;
  transition: 0.3s;
  color: #3ab397;
  border-radius: 50px;
  border: 2px solid #3ab397;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  &:hover {
    color: #fff;
    background: #3aaf9f;
  }
}
.btn-addtask {
  width: 5.6%;
  position: absolute;
  top: 5.5px;
  right: 5.5px;
  border-radius: 50px;
  background: #3ab397;
  color: #fff;
  height: auto;
  padding: 15px;
  border: none;
  @include respond(des) {
    width: 5.6%;
  }
  @include respond(largeTablet) {
    width: 7.3%;
  }
  @include respond(largeMobile) {
    width: 12.5%;
  }
  @include respond(mobile) {
    width: 15%;
  }
}
.btn-filter {
  cursor: pointer;
  width: 70px;
  margin-left: 10px;
  border-radius: 50px;
  border: 1px solid #f0f0f0;
  background: #fff;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-confirm {
  width: 50%;
  font-weight: 700;
  box-sizing: border-box;
  background: #3ab397;
  transition: 0.3s;
  color: #fff;
  border-radius: 3px;
  border: none;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  flex-grow: 1;
}
.outline {
  color: #3ab397 !important;
  background: none !important;
  border: 2px solid #3ab397 !important;
  &:hover {
    color: #fff !important;
    background: #3aaf9f !important;
  }
}
</style>
