<template>
  <div class="todo-list">
    <h1 class="todo__title">My Tasks</h1>
    <div class="todo__form">
      <input
        type="text"
        class="todo__input"
        placeholder="What need to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo"
        :disabled="isDisable"
      />
      <button class="todo__button" @click="addTodo"><i class="fas fa-plus"></i></button>
    </div>
    <todo-item v-for="(todo, index) in listTodo" :key="index" :todo="todo">
    </todo-item>
    <div class="function__button">
      <pagination v-show="isPagination"></pagination>
      <todo-filter></todo-filter>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "./layouts/Loading.vue";
import Pagination from "./layouts/Pagination.vue";
import TodoItem from "./TodoItem.vue";
import TodoFilter from "./TodoFilter.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { TodoItem, Loading, TodoFilter, Pagination },
  data() {
    return {
      newTodo: "",
      isLoading: false,
      isDisable: false,
      isPagination: true,
    };
  },
  computed: {
    ...mapState({
      filter: (state) => state.todos.filter,
      listTodo: (state) => state.todos.todos,
      loading: (state) => state.todos.loading,
      errorText: (state) => state.todos.error,
      count: (state) => {
        if (state.todos.count <= 4) {
          return 4;
        } else {
          return state.todos.count;
        }
      },
    }),
  },
  watch: {
    listTodo() {
      this.isLoading = false;
      this.isDisable = false;
    },
    count() {
      this.getListTodo({
        filter: "all",
        limit: 4,
        skip: this.count - 1 * 4,
      });
    },
    filter() {
      this.filter !== "all"
        ? (this.isPagination = false)
        : (this.isPagination = true);
    },
    loading() {
      if (this.loading) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    },
    errorText() {
      if (this.errorText !== "") {
        this.$notify({
          group: "error",
          title: this.errorText,
        });
        this.isLoading = false;
      }
    },
  },
  methods: {
    ...mapActions({
      getListTodo: "todos/getList/getListTodo",
      getAllList: "todos/getAll/getAllList",
      addTask: "todos/addTask/addTodo",
    }),
    async addTodo() {
      this.isLoading = true;
      this.isDisable = true;
      if (this.newTodo.trim().length == 0) {
        return;
      }
      await this.addTask(this.newTodo);
      this.newTodo = "";
      await this.getAllList();
    },
  },
  async created() {
    await this.getAllList();
    await this.getListTodo({
      filter: "all",
      limit: 4,
      skip: this.count - 1 * 4,
    });
  },
};
</script>

<style lang="scss"></style>
