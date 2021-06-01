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
export default {
  props: ["id"],
  data() {
    return {
      isDelete: false,
      yes: true,
      no: false,
    };
  },
  methods: {
    DeleteTask() {
      this.$emit("confirmDelete", this.isDelete);
      this.removeTodo();
    },
    ClosePopup() {
      this.isDelete = false;
      this.$emit("confirmDelete", this.isDelete);
    },
    removeTodo() {
      this.$store
        .dispatch("removeTodo", this.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
