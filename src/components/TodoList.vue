<template>
  <div class="todo-list">
    <h1 class="todo__title">My Tasks</h1>
    <div class="todo__form">
      <input
        type="text"
        class="todo__input"
        placeholder="What need to be done"
        v-model="newTodo"
        @keyup.enter="addTodo"
        :disabled="isDisable"
      />
      <button class="todo__button" @click="addTodo">Add</button>
    </div>
    <todo-item v-for="(todo, index) in listTodo" :key="index" :todo="todo">
    </todo-item>
    <todo-filter></todo-filter>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "./layouts/Loading.vue";
import TodoItem from "./TodoItem.vue";
import TodoFilter from "./TodoFilter.vue";
import { mapActions } from "vuex";
export default {
  components: { TodoItem, Loading, TodoFilter },
  data() {
    return {
      newTodo: "",
      isLoading: false,
      isDisable: false,
    };
  },
  computed: {
    listTodo() {
      return this.$store.getters['todos/todosFiltered'];
    },
  },
  watch: {
    listTodo() {
      this.isLoading = false;
      this.isDisable = false;
    },
  },
  methods: {
    ...mapActions({
      getListTodo: "todos/getList/getListTodo",
      addTask: "todos/addTask/addTodo",
    }),
    addTodo() {
      this.isLoading = true;
      this.isDisable = true;
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.addTask(this.newTodo);
      this.newTodo = "";
    },
  },
  mounted() {},
  created() {
    this.isLoading = true;
    this.getListTodo();
  },
};
</script>

<style lang="scss"></style>
