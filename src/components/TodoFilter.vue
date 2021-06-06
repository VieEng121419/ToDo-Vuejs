<template>
  <div class="filter__container">
    <button :class="[{ active: filter == 'all' }]" @click="change('all')">
      <span>All</span>
    </button>
    <button :class="[{ active: filter == 'new' }]" @click="change('new')">
      <span>New</span>
    </button>
    <button
      :class="[{ active: filter == 'completed' }]"
      @click="change('completed')"
    >
      <span>Completed</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    filter() {
      return this.$store.state.todos.filter;
    },
  },
  methods: {
    ...mapActions({ changeFilter: "todos/filterTask/updateFilter" }),
    change(filter) {
      this.changeFilter(filter);
    },
  },
};
</script>

<style lang="scss">
.filter__container {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
  button {
    width: 10%;
    margin-left: 10px;
    border-radius: 50px;
    border: 1px solid #f0f0f0;
    background: #fff !important;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #e75b35;
      font-size: 10px;
    }
    &:hover {
      border: none;
      background: #e75b35;
      span {
        color: #fff;
      }
    }
    &.active {
      background: #e75b35 !important;
      border: none !important;
      span {
        color: #fff;
      }
    }
  }
}
</style>
