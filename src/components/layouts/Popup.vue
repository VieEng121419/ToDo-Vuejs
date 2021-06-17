<template>
  <div class="popup__container" v-if="visible">
    <div class="modal-wrapper">
      <img
        v-if="check"
        class="modal-img"
        src="@/assets/check.png"
        alt="check"
      />
      <img v-else class="modal-img" src="@/assets/error.png" alt="error" />
      <h2 class="modal-title">{{ text }}</h2>
      <div class="modal-buttons">
        <Button type="confirm" @click="hide">Close</Button>
      </div>
    </div>
    <div class="popup__fill"></div>
  </div>
</template>

<script>
import Modal from "../../plugins/popup";
import Button from "../base/BaseButton.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      visible: false,
      check: true,
      text: "",
      onConfirm: {},
    };
  },
  methods: {
    hide() {
      this.visible = false;
    },
    confirm() {
      if (typeof this.onConfirm === "function") {
        this.onConfirm();
        this.hide();
      } else {
        this.hide();
      }
    },
    show(params) {
      this.visible = true;
      this.title = params.title;
      this.text = params.text;
      this.check = params.check;
      this.onConfirm = params.onConfirm;
    },
  },
  beforeMount() {
    Modal.EventBus.$on("show", (params) => {
      this.show(params);
    });
  },
};
</script>

<style></style>
