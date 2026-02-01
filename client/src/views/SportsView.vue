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
      <!-- módosítás: nem kell, ha nincs lapozás -->
      <!-- Paginátor -->
      <div class="col-auto p-1"> | ({{ pagination.total }}) |</div>
      <SetSelectedPerPage class="col-auto" :useCollectionStore="useCollectionStore" />
      <Pagination
        class="ms-1 col"
        :useCollectionStore="useCollectionStore"
        :selectedPerPage="Number(selectedPerPage)"
      />
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
import { useSportStore } from "@/stores/sportStore";
//Komponensek
//módosítás
import FormItem from "@/components/Forms/FormSport.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import SetSelectedPerPage from "@/components/Pagination/SetSelectedPerPage.vue";
import ButtonsCrudCreate from "@/components/Table/ButtonsCrudCreate.vue";

export default {
  //módosítás
  name: "sports",
  components: {
    FormItem,
    Pagination,
    SetSelectedPerPage,
    ButtonsCrudCreate,
  },
  data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
      //módosítás
      pageTitle: "Sportok",
      //módosítás
      tableColumns: [
        { key: "id", label: "ID", debug: import.meta.env.VITE_DEBUG_MODE },
        { key: "sportNev", label: "Sportnév", debug: 2 },
      ],
      isOpenConfirmModal: false,
      selectedId: null,
      title: "",
      state: "r", //'crud'
      // módosítás
      useCollectionStore: useSportStore,
    };
  },
  computed: {
    //módosítás
    ...mapState(useSportStore, [
      "item",
      "items",
      "loading",
      "error",
      "selectedPerPage",
      "pagination",
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
        this.sortColumn
      );
    },
  },
  methods: {
    //módosítás
    ...mapActions(useSportStore, [
      "setSelectedPerPage",
      "clearItem",
      "getAll",
      "getPaging",
      "getById",
      "create",
      "update",
      "delete",
    ]),
    handleSort(column) {
      // Ha ugyanarra az oszlopra kattint, megfordítjuk az irányt
      this.getPaging(
        1,
        this.selectedPerPage,
        column
      );
    },
    //módosítás: Csak ha van lapozás
    async pageChangeHandler(page) {
      await this.getPaging(
        page,
        this.selectedPerPage,
        this.sortColumn,
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
    //módosítás, ha nem kell lapozás: this.getAll()
    await this.getPaging(1, this.selectedPerPage);
    // this.setSelectedPerPage(this.selectedPerPage);
  },
};
</script>

<style></style>
