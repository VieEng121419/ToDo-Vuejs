<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input
        type="checkbox"
        v-model="todo.completed"
        class="todo-checkbox"
        @click.prevent="
          doneEdit({
            description: todo.description,
            completed: !todo.completed,
          })
        "
      />
      <div
        v-if="!edit"
        class="todo-item-label"
        :class="{ completed: todo.completed }"
      >
        {{ todo.description }}
      </div>
      <input
        v-else
        type="text"
        class="todo-item-edit"
        v-model="todo.description"
        @keyup.esc="cancelEdit"
      />
    </div>
    <div class="todo-item-right">
      <span class="edit-item">
        <i
          v-if="edit"
          class="fas fa-check"
          @click="
            doneEdit({
              description: todo.description,
              completed: todo.completed,
            })
          "
        ></i>
      </span>
      <span v-if="!todo.completed" class="edit-item" @click="editTodo">
        <i class="fas fa-pen"></i>
      </span>
      <span class="remove-item" @click="showPopup">
        &times;
      </span>
    </div>
    <loading v-if="isLoading"></loading>
    <popup-confirm
      v-if="isShow"
      :id="todo._id"
      @confirmDelete="isShow = $event"
    ></popup-confirm>
  </div>
</template>

<script>
import PopupConfirm from "./layouts/PopupConfirm";
import Loading from "./layouts/Loading.vue";
import { mapActions } from "vuex";
export default {
  components: { PopupConfirm, Loading },
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      edit: false,
      isShow: false,
      isLoading: false,
      stt: false,
      filter: "",
    };
  },
  watch: {
    todo() {
      this.isLoading = false;
      this.isShow = false;
    },
  },
  methods: {
    ...mapActions({
      updateTask: "todos/editTask/updateTodo",
      changeFilter: "todos/filterTask/updateFilter",
    }),
    showPopup() {
      this.isShow = true;
    },
    editTodo() {
      this.edit = !this.edit;
    },
    cancelEdit() {
      this.edit = false;
    },
    async doneEdit(info) {
      this.isLoading = true;
      this.edit = false;
      if (info.completed) {
        this.stt = false;
        this.filter = "new";
      } else {
        this.stt = true;
        this.filter = "completed";
      }
      if (this.todo.description.trim() == "") {
        return;
      }
      await this.updateTask({
        id: this.todo._id,
        description: info.description,
        completed: info.completed,
      });
      await this.changeFilter({ stt: this.stt, filter: this.filter });
    },
  },
};
</script>

<style></style>
