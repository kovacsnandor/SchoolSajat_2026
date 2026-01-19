<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- header -->
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
          <button
            type="button"
            class="btn-close"
            @click="
              hide();
              $event.target.blur();
            "
          ></button>
        </div>
        <!-- body -->
        <div class="modal-body">
          <slot></slot>
        </div>
        <!-- footer -->
        <div class="modal-footer">
            <!-- cancel -->
          <button
            type="button"
            class="btn btn-primary"
            v-if="no"
            @click="
              hide();
              $event.target.blur();
            "
          >
            {{ no }}
          </button>
          <!-- save -->
          <button
            type="button"
            class="btn btn-danger"
            @click="
              onClickYes();
              $event.target.blur();
            "
          >
            {{ yes }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  emits: ['yesEvent'],  
  props: {
    title: { type: String, default: "Modális ablak" },
    yes: { type: String, default: "Mentés" },
    no: { type: String, default: "Mégsem" },
  },
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
  methods: {
    onClickYes() {
      this.$emit("yesEvent");
      this.hide();
    },
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },
  },
};
</script>

<style></style>
