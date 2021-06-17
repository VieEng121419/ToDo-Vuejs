<template>
  <div class="filter__container">
    <Button @click="change(false, 'new')" type="filter"
      ><TextBase component="p" variant="filter" size="xs">New</TextBase></Button
    >
    <Button @click="change(true, 'completed')" type="filter"
      ><TextBase component="p" variant="filter" size="xs"
        >Completed</TextBase
      ></Button
    >
    <Button @click="all('all')" type="filter"
      ><TextBase component="p" variant="filter" size="xs">All</TextBase></Button
    >
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "./layouts/Loading.vue";
import Button from "./base/BaseButton.vue";

import { mapActions } from "vuex";
export default {
  components: {
    Loading,
    Button,
  },
  data() {
    return {
      isLoading: false,
      pageIndex: 1,
    };
  },
  computed: {
    filter() {
      return this.$store.state.todos.filter;
    },
    count() {
      return this.$store.state.todos.count;
    },
  },
  watch: {
    filter() {
      this.isLoading = false;
    },
  },
  methods: {
    ...mapActions({
      changeFilter: "todos/filterTask/updateFilter",
      getListTodo: "todos/getList/getListTodo",
    }),
    change(stt, filter) {
      this.changeFilter({ stt, filter });
    },
    all(filter) {
      this.getListTodo({ filter: filter, limit: 4, skip: this.count - 1 * 4 });
    },
  },
};
</script>

<style lang="scss">
.filter__container {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
}
</style>
