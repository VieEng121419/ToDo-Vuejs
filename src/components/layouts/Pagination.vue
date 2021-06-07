<template>
  <div class="button__pagination">
    <button type="button" disabled @click="test">
      <i class="fas fa-angle-left"></i>
    </button>
    <button type="button" disabled @click="test">
      <i class="fas fa-angle-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      alert("ok");
    },
  },
};
</script>

<style lang="scss">
.button__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 35px;
    height: 35px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
