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
        <form
          @submit.prevent="onClickYes"
          :class="{ 'was-validated': validated }"
          novalidate
        >
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
              type="submit"
              class="btn btn-danger"
              @click="$event.target.blur()"
            >
              {{ yes }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  emits: ["yesEvent"],
  props: {
    title: { type: String, default: "Modális ablak" },
    yes: { type: String, default: "Mentés" },
    no: { type: String, default: "Mégsem" },
  },
  data() {
    return {
      modal: null,
      validated: false,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
  methods: {
    onClickYes(event) {
      // validáció
      const form = event.target;
      this.validated = true;
      if (form.checkValidity()===false) {
        //hiba van az űrlapon
        console.log("Hiba az űrlapon");
        
      }else{
        this.$emit("yesEvent");
        this.hide();
      }
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
