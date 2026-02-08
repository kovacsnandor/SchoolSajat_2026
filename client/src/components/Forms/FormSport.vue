<template>
  <div>
    <Modal ref="modal" :title="title" @yesEvent="yesEventHandler">
      <!-- vezérlőelemek -->
      <div class="mb-4 row pt-2">
        <label for="sportNev" class="col-form-label col-auto pt-1 pe-0"
          >Sportnév:</label
        >
        <div class="col">
          <input
            type="text"
            class="form-control"
            id="sportNev"
            v-model="formItem.sportNev"
            @input="clearError('sportNev')"
            required
          />
          <div v-if="!serverErrors.sportNev" class="invalid-feedback position-absolute">
            A sportnév kötelező
          </div>
          <div v-if="serverErrors.sportNev"
            class="invalid-feedback position-absolute d-block"
          >
            {{ serverErrors.sportNev[0] }}
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
  name: "FormSport",
  components: {
    Modal,
  },
  props: {
    title: { type: String, default: "Új sport felvitele" },
    item: { type: Object },
  },
  data() {
    return {
      formItem: { ...this.item },
      serverErrors: {},
    };
  },
  watch: {
    //Fontos!!! frissülhessen a szülő által küldött item
    item(value) {
      this.formItem = { ...value };
    },
  },
  methods: {
    //metódus továbbítás
    show() {
      this.serverErrors = {};
      this.$refs.modal.show();
    },
    hide() {
      this.$refs.modal.hide();
    },
    setServerErrors(errors) {
      this.serverErrors = errors;
    },
    clearError(field) {
      if (this.serverErrors[field]) {
        delete this.serverErrors[field];
      }
    },
    yesEventHandler(done) {
      this.$emit("yesEventForm", { item: this.formItem, done });
    },
  },
};
</script>

<style></style>
