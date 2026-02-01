<template>
  <div>
    <Modal ref="modal" :title="title" 
      @yesEvent="yesEventHandler">
      <!-- vezérlőelemek -->
      <div class="mb-4 row pt-2">
        <label for="osztalyNev" class="col-form-label col-auto pt-1 pe-0">Osztálynév:</label>
        <div class="col">
          <input
            type="text"
            class="form-control"
            id="osztalyNev"
            v-model="formItem.osztalyNev"
            required
          />
          <div class="invalid-feedback position-absolute">Az osztály neve kötelező</div>
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
      formItem: this.item,
    };
  },
  watch: {
    //Fontos!!! frissülhessen a szülő által küldött item
    item(value){
      this.formItem = value;
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
      this.$emit("yesEventForm", this.formItem);
    },
  },
};
</script>

<style></style>
