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
    <div class="modal-dialog modal-dialog-centered" :class="modalSizeClass">
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
    modalSize: { type: String, default: "" },
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
  computed: {
    modalSizeClass() {
      return {
        "modal-sm": this.modalSize == "sm",
        "modal-lg": this.modalSize == "lg",
        "modal-xl": this.modalSize == "xl",
      };
    },
  },
  methods: {
    //Modal yes gombjának kezelése
    onClickYes(event) {
      const form = event.target;
      this.validated = true;
      // Van-e űrlap kitöltési hiba
      if (form.checkValidity() === false) {
        //hiba van az űrlapon
        console.log("Kliens oldali hiba az űrlapon");
      } else {
        //Nincs hiba az űrlapon
        // Átadunk egy függvényt (callback), amit a szülő hív meg, ha végzett
        this.$emit("yesEvent", (success) => {
          if (success) {
            this.hide();
          } else {
            // Ha success === false, nem hívunk hide()-ot, a modal nyitva marad a hibákkal
            console.log("Szerveroldali hiba, a modal marad");
          }
        });
      }
    },
    show() {
      this.modal.show();
      this.validated = false;
    },
    hide() {
      this.modal.hide();
      this.validated = false;
    },
  },
};
</script>

<style></style>
