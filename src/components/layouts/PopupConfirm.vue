<template>
  <div class="todo__popup">
    <div class="todo__popup--container">
      <h5 class="title__popup">Are you sure to delete a task?</h5>
      <div class="button__popup">
        <i class="fas fa-check" title="yes" @click="DeleteTask()"></i>
        <i class="fas fa-times" title="no" @click="ClosePopup()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      isDelete: false,
    };
  },
  methods: {
    ...mapActions({
      deleteTask: "todos/deleteTask/removeTodo",
      getAllList: "todos/getAll/getAllList",
    }),
    DeleteTask() {
      this.isDelete = true;
      this.$emit("confirmDelete", this.isDelete);
      this.removeTodo();
    },
    ClosePopup() {
      this.isDelete = false;
      this.$emit("confirmDelete", this.isDelete);
    },
    async removeTodo() {
      this.isDelete = false;
      await this.deleteTask(this.id);
      await this.getAllList();
    },
  },
};
</script>

<style></style>
