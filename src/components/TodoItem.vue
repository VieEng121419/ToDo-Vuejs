<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input
        type="checkbox"
        class="todo-checkbox"
        v-model="completed"
        @change="doneEdit"
      />
      <div
        v-if="!edit"
        class="todo-item-label"
        :class="{ completed: completed }"
      >
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
      <span class="edit-item">
        <i v-if="edit" class="fas fa-check" @click="doneEdit"></i>
      </span>
      <span v-if="!completed" class="edit-item" @click="editTodo">
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
    doneEdit() {
      if (this.description.trim() == "") {
        return;
      }
      this.$store.dispatch("updateTodo", {
        id: this.id,
        description: this.description,
        completed: this.completed,
      });
      this.editTodo();
    },
  },
};
</script>

<style></style>
