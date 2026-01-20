<template>
  <div>
    <h1>Sportok</h1>
    <Modal ref="modal" :title="title" @yesEvent="yesEventHandler">
      <h5>Form</h5>
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
      console.log("Mentés");
    },
  },
};
</script>

<style></style>
