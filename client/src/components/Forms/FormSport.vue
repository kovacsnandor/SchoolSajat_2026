<template>
  <div>
    <h1>Sportok</h1>
    <Modal ref="modal" :title="title" @yesEvent="yesEventHandler">
      <!-- vezérlőelemek -->
      <div class="mb-3">
        <label for="sportNev" class="form-label"
          >Sportnév:</label
        >
        <input
          type="text"
          class="form-control"
          id="sportNev"
          v-model="formItem.sportNev"
          required
        />
        <div class="invalid-feedback">
          A sportnév kötelező
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";
// import Modal from "../Modal/Modal.vue";
export default {
  name: "FormSport",
  components: {
    Modal,
  },
  props: {
    title: { type: String, default: "Új sport felvitele" },
    item: {type: Object}
  },
  data(){
    return {
      formItem: this.item
    }
  },
  methods: {
    //metódus továbbítás
    show() {
      this.$refs.modal.show();
    },
    hide() {
      this.$refs.modal.hide();
    },
    yesEventHandler() {
      this.$emit('formEvent', this.formItem)
      console.log("Mentés");
    },
  },
};
</script>

<style></style>
