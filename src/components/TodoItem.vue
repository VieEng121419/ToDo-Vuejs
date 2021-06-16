<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <div class="checkbox">
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
      </div>
      <div
        v-if="!edit"
        class="todo-item-label"
        :class="{ completed: todo.completed, active: isActive }"
        title="Edit"
      >
        <TextBase
          :class="{ active: isActive }"
          component="p"
          variant="task-description"
          ellipsis="true"
          @click="isActive = !isActive"
          >{{ todo.description }}</TextBase
        >
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
import TextBase from "./base/TextBase.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { PopupConfirm, Loading, TextBase },
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
      isActive: false,
    };
  },
  computed: {
    ...mapState({
      filterName: (state) => state.todos.filter,
      count: (state) => state.todos.count,
    }),
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
      getAllList: "todos/getAll/getAllList",
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
      if (this.todo.description.trim() == "") {
        return;
      }
      await this.updateTask({
        id: this.todo._id,
        description: info.description,
        completed: info.completed,
      });
      if (this.filterName === "all") {
        await this.getAllList();
      } else if (this.filterName === "new") {
        await this.changeFilter({ stt: false, filter: this.filterName });
      } else {
        await this.changeFilter({ stt: true, filter: this.filterName });
      }
    },
  },
};
</script>

<style></style>
