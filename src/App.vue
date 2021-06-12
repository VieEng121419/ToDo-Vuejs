<template>
  <div class="todo__container">
    <todo-list></todo-list>
    <popup></popup>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
export default {
  name: "App",
  data() {
    return {
      message: "",
      check: true,
    };
  },
  components: {
    TodoList,
  },
  methods: {
    showModal() {
      const params = {
        text: this.message,
        check: this.check,
        onConfirm: () => {
          return this.alertFunc();
        },
      };
      this.$modal.show(params);
    },
  },
  mounted() {
    if (this.$store.state.account.login.logAlert === true) {
      this.message = "Login Successfully!";
      this.showModal();
      this.$store.state.account.login.logAlert = false;
    }
    if (this.$store.state.account.register.resgisAlert === true) {
      this.message = "Register Successfully!";
      this.showModal();
      this.$store.state.account.register.resgisAlert = false;
    }
  },
};
</script>

<style></style>
