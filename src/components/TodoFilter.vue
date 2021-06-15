<template>
  <div class="filter__container">
    <Button
      :title="'New'"
      :type="'filter'"
      @click.native="change(false, 'new')"
    />
    <Button
      :title="'Completed'"
      :type="'filter'"
      @click.native="change(true, 'completed')"
    />
    <Button :title="'All'" :type="'filter'" @click.native="all('all')" />
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "./layouts/Loading.vue";
import Button from "./base/Button.vue";
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
  button {
    width: 70px;
    margin-left: 10px;
    border-radius: 50px;
    border: 1px solid #f0f0f0;
    background: #fff !important;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #3ab397;
      font-size: 10px;
    }
    &:hover {
      border: none;
      background: #3aaf9f !important;
      span {
        color: #fff;
      }
    }
    &.active {
      background: #3ab397 !important;
      border: none !important;
      span {
        color: #fff;
      }
    }
  }
}
</style>
