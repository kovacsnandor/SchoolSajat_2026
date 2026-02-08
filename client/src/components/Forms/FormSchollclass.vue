<template>
  <div>
    <Modal ref="modal" :title="title" @yesEvent="yesEventHandler">
      <!-- Form elemek -->
       <!-- Osztály neve -->
      <div class="mb-4 row pt-2">
        <label for="osztalyNev" class="col-form-label col-auto pt-1 pe-0"
          >Osztálynév:</label
        >
        <div class="col">
          <input
            type="text"
            class="form-control"
            id="osztalyNev"
            v-model="formItem.osztalyNev"
            @input="clearError('osztalyNev')"
            required
          />
          <!-- űrlap hiba -->
          <div
            v-if="!serverErrors.osztalyNev"
            class="invalid-feedback position-absolute"
          >
            Az osztály neve kötelező
          </div>
          <!-- 422-es hiba -->
          <div
            v-if="serverErrors.osztalyNev"
            class="invalid-feedback position-absolute d-block"
          >
            {{ serverErrors.osztalyNev[0] }}
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";
// import Modal from "../Modal/Modal.vue";
export default {
  emits: ["yesEventForm"],
  name: "FormSchoolclass",
  components: {
    Modal,
  },
  props: {
    title: { type: String, default: "Új osztály felvitele" },
    item: { type: Object },
  },
  data() {
    return {
      formItem: { ...this.item },
      serverErrors: {}, // Itt tároljuk a szerver válaszát
    };
  },
  watch: {
    //Fontos!!! frissülhessen a szülő által küldött item
    item(value) {
      this.formItem = { ...value };
      this.serverErrors = {}; // Reseteljük a hibákat, ha új itemet kapunk
    },
  },
  methods: {
    //metódus továbbítás
    //Modal nyitó
    show() {
      this.serverErrors = {}; 
      this.$refs.modal.show();
    },
    //Modal záró
    hide() {
      this.$refs.modal.hide();
    },
    //422-es hiba kezelés
    // View hívja, ha 422-es hiba van
    setServerErrors(errors) {
      this.serverErrors = errors;
    },
    //Mező (field) eltüntetése a serverErrors objektumból
    clearError(field) {
      if (this.serverErrors[field]) {
        delete this.serverErrors[field];
      }
    },

    yesEventHandler(done) {
      // A form adatai és a done callback küldése a View-nak
      this.$emit("yesEventForm", { item: this.formItem, done });
    },
  },
};
</script>

<style></style>
