<template>
  <div>
    <p v-if="debug != 0" class="my-debug">Keresőszó: [{{ searchWord }}]</p>
    <div class="row d-flex align-items-center m-0 mb-2 sticky-top">
      <!-- Az oldal címe -->
      <h1 class="col-auto">
        {{ pageTitle }}
      </h1>

      <!-- homokóra -->
      <i
        v-if="loading"
        class="bi bi-hourglass-split fs-3 col-auto p-0 pe-1"
      ></i>
      <!-- új sor bevitele -->
      <ButtonsCrudCreate
        class="col-auto p-0"
        v-if="!loading"
        @create="createHandler"
      />
      <!-- osztály lista -->
      <select class="form-select ms-3" style="width:100px;" aria-label="Default select example" v-model="schoolclassId" size="1">
        <option v-for="item in scholclassItems" :key="item.id" :value="item.id">
          {{ item.osztalyNev }}
        </option>
      </select>
    </div>

    <!-- Táblázat CRUD -->
    <div class="mt-2">
      <ToastContainer />

      <!-- Táblázat -->
      <GenericTable
        :items="items"
        :columns="tableColumns"
        :useCollectionStore="useCollectionStore"
        @sort="handleSort"
        @create="createHandler"
        @update="updateHandler"
        @delete="deleteHandler"
      />
    </div>

    <!-- Confirm modal -->
    <ConfirmModal
      :isOpenConfirmModal="isOpenConfirmModal"
      @confirm="confirmHandler"
      @cancel="cancelHandler"
    />

    <!-- Form -->
    <FormItem
      ref="form"
      :title="title"
      :item="item"
      @yesEventForm="yesEventFormHandler"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSearchStore } from "@/stores/searchStore";
//módosítás
import { useStudentStore } from "@/stores/studentStore";
import { useSchoolclassStore } from "@/stores/schoolclassStore";
//Komponensek
//módosítás
import FormItem from "@/components/Forms/FormStudent.vue";
import ButtonsCrudCreate from "@/components/Table/ButtonsCrudCreate.vue";

export default {
  //módosítás
  name: "StudentsView",
  components: {
    FormItem,
    ButtonsCrudCreate,
  },
  data() {
    const debugValue = import.meta.env.VITE_DEBUG_MODE;
    return {
      debug: debugValue,
      //módosítás
      pageTitle: "Tanulók adatbevitel",
      //módosítás
      schoolclassId: null,
      tableColumns: [
        { key: "id", label: "ID", debug: debugValue },
        { key: "diakNev", label: "Név", debug: 2 },
        { key: "schoolclassId", label: "Osztály ID", debug: 0 },
        { key: "neme", label: "Neme (kód)", debug: 0 },
        { key: "iranyitoszam", label: "Isz.", debug: 2 },
        { key: "lakHelyseg", label: "Helység", debug: 2 },
        { key: "lakCim", label: "Lakcím", debug: 2 },
        { key: "szulHelyseg", label: "Szül.hely", debug: 2 },
        { key: "szulDatum", label: "Születésid.", debug: 2 },
        { key: "igazolvanyszam", label: "Ig.szám", debug: 2 },
        { key: "atlag", label: "Á.", debug: 2 },
        { key: "osztondij", label: "Öszt.díj", debug: 2 },
        { key: "eletkor", label: "Kor", debug: 2 },
        { key: "nemeString", label: "Nem", debug: 2 },
      ],
      isOpenConfirmModal: false,
      selectedId: null,
      title: "",
      state: "r", //'crud'
      //módosítás
      useCollectionStore: useStudentStore,
    };
  },
  computed: {
    //módosítás
    ...mapState(useStudentStore, [
      "item",
      "items",
      "loading",
      "error",
      "sortColumn",
      "sortDirection",
    ]),
    ...mapState(useSearchStore, ["searchWord"]),
    ...mapState(useSchoolclassStore, {
      scholclassItems: "items",
    }),
  },
  watch: {
    // Ha változik a keresőszó, újra keresünk
    searchWord(newValue) {
      this.getAllByShoolclassId(this.schoolclassId);
    },
    schoolclassId(value){
      this.getAllByShoolclassId(this.schoolclassId);
    }
  },
  methods: {
    //módosítás
    ...mapActions(useStudentStore, [
      "clearItem",
      "getAllByShoolclassId",
      "getAll",
      "getById",
      "create",
      "update",
      "delete",
    ]),
    ...mapActions(useSearchStore, ["reset"]),
    ...mapActions(useSchoolclassStore, {
      getAllAbcScholclass: "getAllAbc",
    }),
    handleSort(column) {
      console.log("xxxxxxx", column);

      this.getAllByShoolclassId(this.schoolclassId, column);
    },
    createHandler() {
      this.state = "c";
      this.title = "Új adatbevitel";
      this.clearItem();
      this.$refs.form.show();
    },
    async updateHandler(id) {
      this.state = "u";
      this.title = "Adatmódosítás";
      await this.getById(id);
      this.$refs.form.show();
    },
    deleteHandler(id) {
      this.state = "d";
      this.selectedId = id;
      this.isOpenConfirmModal = true;
    },
    async confirmHandler() {
      await this.delete(this.selectedId);
      this.state = "r";
      this.isOpenConfirmModal = false;
    },
    cancelHandler() {
      this.isOpenConfirmModal = false;
    },
    async yesEventFormHandler(item) {
      if (this.state === "c") {
        //új rekord
        await this.create(item);
        this.state = "r";
      } else if (this.state === "u") {
        //rekord módosítás
        await this.update(item.id, item);
        this.state = "r";
      }
    },
  },
  async mounted() {
    this.reset();
    await this.getAllAbcScholclass();
    this.schoolclassId = this.scholclassItems[0].id;
    await this.getAllByShoolclassId(this.schoolclassId);
  },
};
</script>

<style></style>
