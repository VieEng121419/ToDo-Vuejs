<template>
  <div id="app">
    <h1>TO DO LIST</h1>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
export default {
  name: "App",
  components: {
    TodoList,
  },
  created() {
    if (this.$store.state.logAlert === true) {
      alert("Login Successfully");
      this.$store.state.logAlert = false;
    }
    if (this.$store.state.resgisAlert === true) {
      alert("Register Successfully");
      this.$store.state.resgisAlert = false;
    }
    if (this.$store.state.editAlert === true) {
      alert("Info Updated");
      this.$store.state.editAlert = false;
    }
  },
};
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
