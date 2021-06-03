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
    if (this.$store.state.auth.logAlert === true) {
      this.message = "Login Successfully!";
      this.showModal();
      this.$store.state.auth.logAlert = false;
    }
    if (this.$store.state.auth.resgisAlert === true) {
      this.message = "Register Successfully!";
      this.showModal();
      this.$store.state.auth.resgisAlert = false;
    }
    if (this.$store.state.editUser.editAlert === true) {
      this.message = "Edit Successfully!";
      this.showModal();
      this.$store.state.editAlert = false;
    }
    if (this.$store.state.editUser.avaAlert === true) {
      this.message = "Avatar Updated!";
      this.showModal();
      this.$store.state.avaAlert = false;
    }
  },
};
</script>

<style></style>
