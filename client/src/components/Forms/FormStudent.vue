<template>
  <div>
    <Modal
      ref="modal"
      :title="title"
      modalSize="lg"
      @yesEvent="yesEventHandler"
    >
      <!-- vezérlőelemek -->
      <div class="row">
        <!-- név, osztály, neme -->
        <div class="row col-md-12 col-lg-7  ms-0 p-0 mt-3">
          <label for="diakNev" class="col-form-label col-auto pt-1 pe-0"
            >Név:</label
          >
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="diakNev"
              v-model="formItem.diakNev"
              required
            />
            <div class="invalid-feedback position-absolute">
              Az diák neve kötelező
            </div>
          </div>
        </div>
        <!-- osztály -->
        <div class="col-md-6 col-lg-2 mt-3">
          <select
            class="form-select ms-3"
            style="width: 100px"
            aria-label="Default select example"
            v-model="formItem.schoolclassId"
            size="1"
          >
            <option
              v-for="sItem in scholclassItems"
              :key="sItem.id"
              :value="sItem.id"
            >
              {{ sItem.osztalyNev }}
            </option>
          </select>
        </div>
        <!-- neme -->
        <div class="col-md-6 col-lg-3 d-flex align-items-center ps-4 mt-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="neme"
              id="fiu"
              :value="1"
              v-model="formItem.neme"
            />
            <label class="form-check-label" for="fiu">
              fiú
            </label>
          </div>
          <div class="form-check ms-2">
            <input
              class="form-check-input"
              type="radio"
              name="neme"
              id="lany"
              :value="0"
              v-model="formItem.neme"
            />
            <label class="form-check-label" for="lany">
              lány
            </label>
          </div>
        </div>
      </div>
      <!-- irszám, helység, cím -->
       <div class="row mt-4">
        <!-- irszám -->
        <div class="row col-md-12 col-lg-2 ms-0 p-0 mt-2">
          <label for="iranyitoszam" class="col-form-label col-auto pt-1 pe-0"
            >I:</label
          >
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="iranyitoszam"
              v-model="formItem.iranyitoszam"
              required
            />
            <div class="invalid-feedback position-absolute">
              Az irányítószám kötelező
            </div>
          </div>
        </div>
                <!-- helység -->
        <div class="row col-md-12 col-lg-4 ms-0 p-0 mt-2">
          <label for="lakHelyseg" class="col-form-label col-auto pt-1 pe-0"
            >Helység:</label
          >
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="lakHelyseg"
              v-model="formItem.lakHelyseg"
              required
            />
            <div class="invalid-feedback position-absolute">
              A helység kötelező
            </div>
          </div>
        </div>
          <!-- cím -->
        <div class="row col-md-12 col-lg-6 ms-0 p-0 mt-2">
          <label for="lakCim" class="col-form-label col-auto pt-1 pe-0"
            >Cím:</label
          >
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="lakCim"
              v-model="formItem.lakCim"
              required
            />
            <div class="invalid-feedback position-absolute">
              A helység kötelező
            </div>
          </div>
        </div>
       </div>
       <!-- szülh, szülidő, igszám -->
       <div class="row mt-3">
        <!-- szülh -->
        <div class="row col-md-12 col-lg-4 ms-0 p-0 mt-2">
          <label for="szulHelyseg" class="col-form-label col-auto pt-1 pe-0"
            >Született: </label
          >
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="szulHelyseg"
              v-model="formItem.szulHelyseg"
              required
            />
            <div class="invalid-feedback position-absolute">
              A születési hely kötelező
            </div>
          </div>
        </div>

        <!-- szüldátum -->
        <div class="row col-md-12 col-lg-4 ms-0 p-0 mt-2">
          <label for="szulDatum" class="col-form-label col-auto pt-1 pe-0"
            >Szül.idő: </label
          >
          <div class="col">
            <input
              type="date"
              class="form-control"
              id="szulDatum"
              v-model="formItem.szulDatum"
              required
            />
            <div class="invalid-feedback position-absolute">
              A születési idő kötelező
            </div>
          </div>
        </div>
        <!-- szüldátum -->
        <div class="row col-md-12 col-lg-4 ms-0 p-0 mt-2">
          <label for="igazolvanyszam" class="col-form-label col-auto pt-1 pe-0"
            >Igazolványszám: </label
          >
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="igazolvanyszam"
              v-model="formItem.igazolvanyszam"
              required
            />
            <div class="invalid-feedback position-absolute">
              Az Igazolványszám kötelező
            </div>
          </div>
        </div>
       </div>

              <!-- átlag, ösztöndíj -->
       <div class="row mt-3">
        <!-- átlag -->
        <div class="row col-md-6 col-lg-3 ms-0 p-0 mt-2">
          <label for="atlag" class="col-form-label col-auto pt-1 pe-0"
            >Átlag: </label
          >
          <div class="col">
            <input
              type="number"
              class="form-control"
              id="atlag"
              v-model="formItem.atlag"
              step="0.1"
              required
            />
            <div class="invalid-feedback position-absolute">
              Az Átlag kötelező
            </div>
          </div>
        </div>

        <!-- ösztöndíj -->
        <div class="row col-md-6 col-lg-4 ms-0 p-0 mt-2">
          <label for="osztondij" class="col-form-label col-auto pt-1 pe-0"
            >Ösztöndíj (Ft): </label
          >
          <div class="col">
            <input
              type="number"
              class="form-control"
              id="osztondij"
              v-model="formItem.osztondij"
              required
            />
            <div class="invalid-feedback position-absolute">
              Az Ösztöndíj kötelező
            </div>
          </div>
        </div>
        


       </div>

    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import Modal from "@/components/Modal/Modal.vue";
import { useSchoolclassStore } from "@/stores/schoolclassStore";

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
  computed: {
    ...mapState(useSchoolclassStore, {
      scholclassItems: "items",
    }),
  },
  watch: {
    //Fontos!!! frissülhessen a szülő által küldött item
    item(value) {
      this.formItem = value;
    },
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
