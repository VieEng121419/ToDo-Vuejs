<template>
  <div class="todo-list">
    <TextBase component="h1" class="todo__title" weight="bold">{{
      title
    }}</TextBase>
    <div class="todo__form">
      <input
        type="text"
        class="todo__input"
        placeholder="What need to be done?"
        v-model="$v.newTodo.$model"
        @keyup.enter="addTodo"
        :disabled="isDisable"
      />
      <div v-if="statusErr" class="err">
        <div class="error" v-if="!$v.newTodo.required">
          Task content is required
        </div>
        <div class="error" v-if="!$v.newTodo.maxLength">
          Task content must have less then
          {{ $v.newTodo.$params.maxLength.max }} letters.
        </div>
      </div>
      <Button class="todo__button" @click="addTodo" type="addtask"
        ><i class="fas fa-plus"></i
      ></Button>
    </div>
    <todo-item v-for="(todo, index) in listTodo" :key="index" :todo="todo">
    </todo-item>
    <div class="function__button">
      <pagination v-show="isPagination"></pagination>
      <todo-filter></todo-filter>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import Loading from "./layouts/Loading.vue";
import Pagination from "./layouts/Pagination.vue";
import TodoItem from "./TodoItem.vue";
import TodoFilter from "./TodoFilter.vue";
import Button from "./base/BaseButton.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { TodoItem, Loading, TodoFilter, Pagination, Button },
  data() {
    return {
      newTodo: "",
      isLoading: false,
      isDisable: false,
      isPagination: true,
      statusErr: false,
      title: "My Tasks",
    };
  },
  validations: {
    newTodo: {
      required,
      maxLength: maxLength(1000),
    },
  },
  computed: {
    ...mapState({
      filter: (state) => state.todos.filter,
      listTodo: (state) => state.todos.todos,
      loading: (state) => state.todos.loading,
      errorText: (state) => state.todos.error,
      count: (state) => {
        if (state.todos.count <= 4) {
          return 4;
        } else {
          return state.todos.count;
        }
      },
    }),
  },
  watch: {
    listTodo() {
      this.isLoading = false;
      this.isDisable = false;
    },
    count() {
      this.getListTodo({
        filter: "all",
        limit: 4,
        skip: this.count - 1 * 4,
      });
    },
    filter() {
      this.filter !== "all"
        ? (this.isPagination = false)
        : (this.isPagination = true);
    },
    loading() {
      if (this.loading) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    },
    errorText() {
      if (this.errorText !== "") {
        this.$notify({
          group: "error",
          title: this.errorText,
        });
        this.isLoading = false;
      }
    },
  },
  methods: {
    ...mapActions({
      getListTodo: "todos/getList/getListTodo",
      getAllList: "todos/getAll/getAllList",
      addTask: "todos/addTask/addTodo",
    }),
    async addTodo() {
      if (this.newTodo.trim().length == 0 || this.$v.$invalid) {
        this.statusErr = true;
      } else {
        this.statusErr = false;
        this.isLoading = true;
        this.isDisable = true;
        await this.addTask(this.newTodo);
        this.newTodo = "";
        await this.getAllList();
      }
    },
  },
  async created() {
    await this.getAllList();
    await this.getListTodo({
      filter: "all",
      limit: 4,
      skip: this.count - 1 * 4,
    });
  },
};
</script>

<style lang="scss" scoped></style>
