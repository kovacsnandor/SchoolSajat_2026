<template>
  <div>
    <h1>Sportok</h1>
    <Modal ref="modal" :title="title" 
      @yesEvent="yesEventHandler">
      <!-- vezérlőelemek -->
      <div class="mb-4 row pt-2">
        <label for="sportNev" class="col-form-label col-auto pt-1 pe-0">Sportnév:</label>
        <div class="col">
          <input
            type="text"
            class="form-control"
            id="sportNev"
            v-model="formItem.sportNev"
            required
          />
          <div class="invalid-feedback position-absolute">A sportnév kötelező</div>
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
