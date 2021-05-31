<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" class="todo-checkbox" />
      <div v-if="!edit" class="todo-item-label">
        {{ description }}
      </div>
      <input
        v-else
        type="text"
        class="todo-item-edit"
        v-model="description"
        @keyup.esc="cancelEdit"
      />
    </div>
    <div class="todo-item-right">
      <span class="edit-item" @click="editTodo">
        <i class="fas fa-pen"></i>
      </span>
      <span class="remove-item" @click="removeTodo">
        &times;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo._id,
      description: this.todo.description,
      completed: this.todo.completed,
      edit: false,
    };
  },
  methods: {
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
    editTodo() {
      this.edit = !this.edit;
    },
    cancelEdit() {
      this.edit = false;
    },
  },
};
</script>

<style></style>
