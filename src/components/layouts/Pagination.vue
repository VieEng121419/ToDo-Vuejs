<template>
  <div class="button__pagination">
    <button type="button" :disabled="isDisablePrev" :class="{disablePrev: isDisablePrev}" @click="prev">
      <i class="fas fa-angle-left"></i>
    </button>
    <button type="button" :disabled="isDisableNext" :class="{disableNext: isDisableNext}" @click="next">
      <i class="fas fa-angle-right"></i>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      pageIndex: 1,
      isDisableNext: false,
      isDisablePrev: true,
    };
  },
  computed: {
    ...mapState({
      count: (state) => state.todos.count,
      indexPage: (state) => state.todos.pageIndex,
    }),
  },
  watch: {
    count() {
      if (this.count > 4) this.isDisableNext = false;
    },
    indexPage() {
      this.pageIndex = 1;
      this.isDisableNext = false;
      this.isDisablePrev = true;
    },
  },
  methods: {
    ...mapActions({ getListTodo: "todos/getList/getListTodo" }),
    checkLimitNext() {
      if (this.count - this.pageIndex * 4 <= 0) {
        this.isDisableNext = true;
        return this.count - (this.pageIndex - 1) * 4;
      } else {
        return 4;
      }
    },
    next() {
      this.pageIndex += 1;
      this.isDisablePrev = false;
      this.getListTodo({
        filter: "all",
        limit: this.checkLimitNext(),
        skip:
          this.count - this.pageIndex * 4 <= 0
            ? 0
            : this.count - this.pageIndex * 4,
      });
    },
    prev() {
      this.pageIndex -= 1;
      if (this.pageIndex == 1) {
        this.isDisablePrev = true;
        this.isDisableNext = false;
      } else {
        this.isDisablePrev = false;
        this.isDisableNext = false;
      }
      this.getListTodo({
        filter: "all",
        limit: 4,
        skip: this.count - this.pageIndex * 4,
      });
    },
  },
  created() {
    if (this.count <= 4) {
      this.isDisableNext = true;
      this.isDisablePrev = true;
    }
  },
};
</script>

<style lang="scss">
.button__pagination {
  display: flex;
  margin-top: 23px;
  button {
    width: 35px;
    height: 35px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.disableNext{
      background: #fff !important;
      border: 1px solid #3aaf9f;
      i{
        color: #3aaf9f;
      }
    }
     &.disablePrev{
       background: #fff !important;
      border: 1px solid #3aaf9f;
      i{
        color: #3aaf9f;
      }
    }
  }
}
</style>
