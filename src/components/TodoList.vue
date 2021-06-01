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
      />
      <button class="todo__button" @click="addTodo">Add</button>
    </div>
    <todo-item v-for="(todo, index) in listTodo" :key="index" :todo="todo">
    </todo-item>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  components: { TodoItem },
  data() {
    return {
      newTodo: "",
    };
  },
  computed: {
    listTodo() {
      return this.$store.state.todos.data;
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.$store
        .dispatch("addTodo", this.newTodo)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.newTodo = "";
    },
  },
  created() {
    this.$store
      .dispatch("getListTodo")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss"></style>
