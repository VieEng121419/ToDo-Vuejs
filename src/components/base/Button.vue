<template>
  <div>
    <div class="form-group" v-if="form">
      <button type="submit">{{ title }}</button>
    </div>
    <button v-if="avatar" type="submit">
      {{ title }}
    </button>
    <button class="todo__button" v-if="addTodo">
      <i class="fas fa-plus"></i>
    </button>
    <button :class="[{ active: isActive }]" v-if="filter">
      <span>{{ title }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      avatar: false,
      form: false,
      addTodo: false,
      Pagination: false,
      filter: false,
      isActive: false,
    };
  },
  created() {
    if (this.type === "avatar") {
      this.avatar = true;
    } else if (this.type === "form") {
      this.form = true;
    } else if (this.type === "add-todo") {
      this.addTodo = true;
    } else if (this.type === "pagination") {
      this.addTodo = true;
    } else {
      this.filter = true;
    }
  },
};
</script>

<style></style>
