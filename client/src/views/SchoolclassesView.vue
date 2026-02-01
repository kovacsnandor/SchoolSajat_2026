<template>
  <div>
    <p v-if="debug != 0" class="my-debug">Keresőszó: [{{ searchWord }}]</p>
    <div class="row d-flex align-items-center m-0 mb-2 sticky-top">
      <!-- Az oldal címe -->
      <h1 class="col-auto">
        {{ pageTitle }}
      </h1>
  
      <!-- homokóra -->
      <i v-if="loading" class="bi bi-hourglass-split fs-3 col-auto p-0 pe-1"></i>
      <ButtonsCrudCreate class="col-auto p-0" v-if="!loading" @create="createHandler"/>
    </div>

    <!-- Táblázat CRUD -->
    <div>
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
import { useSchoolclassStore } from "@/stores/schoolclassStore";
//Komponensek
//módosítás
import FormItem from "@/components/Forms/FormSchollclass.vue";
import ButtonsCrudCreate from "@/components/Table/ButtonsCrudCreate.vue";

export default {
  //módosítás
  name: "SchoolclassesView",
  components: {
    FormItem,
    ButtonsCrudCreate,
  },
  data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
      //módosítás
      pageTitle: "Osztályok",
      //módosítás
      tableColumns: [
        { key: "id", label: "ID", debug: import.meta.env.VITE_DEBUG_MODE },
        { key: "osztalyNev", label: "Osztálynév", debug: 2 },
      ],
      isOpenConfirmModal: false,
      selectedId: null,
      title: "",
      state: "r", //'crud'
      //módosítás
      useCollectionStore: useSchoolclassStore,
    };
  },
  computed: {
    //módosítás
    ...mapState(useSchoolclassStore, [
      "item",
      "items",
      "loading",
      "error",
      "sortColumn",
      "sortDirection",
    ]),
    ...mapState(useSearchStore, ["searchWord"]),
  },
  watch: {
    // Ha változik a keresőszó, ugorjunk az 1. oldalra és keressünk
    
    searchWord(newValue) {
      this.getPaging(
        1,
        this.selectedPerPage,
        this.sortColumn,
        this.sortDirection,
        newValue,
      );
    },
  },
  methods: {
    //módosítás
    ...mapActions(useSchoolclassStore, [
      "clearItem",
      "getAll",
      "getById",
      "create",
      "update",
      "delete",
    ]),
    handleSort(column) {
      // Ha ugyanarra az oszlopra kattint, megfordítjuk az irányt
      const direction =
        this.sortColumn === column && this.sortDirection === "asc"
          ? "desc"
          : "asc";
      this.getPaging(
        1,
        this.selectedPerPage,
        column,
        direction,
        this.searchWord,
      );
    },
    createHandler() {
      this.state = "c";
      console.log("create");
      this.title = "Új adatbevitel";
      this.clearItem();
      this.$refs.form.show();
    },
    async updateHandler(id) {
      this.state = "u";
      console.log("update:", id);
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
        console.log("új rekord");
        await this.create(item);
        this.state = "r";
      } else if (this.state === "u") {
        //rekord módosítás
        console.log("rekord módosítás");
        await this.update(item.id, item);
        this.state = "r";
      }
    },
  },
  async mounted() {
    await this.getAll();
  },
};
</script>

<style></style>
