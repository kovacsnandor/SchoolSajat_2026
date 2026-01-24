<template>
  <div>
    <p v-if="debug != 0" class="my-debug">Keresőszó: [{{ searchWord }}]</p>
    <div class="d-flex justify-content-between align-items-center">
      <h1>
        {{ pageTitle }}
        <!-- <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> -->
      </h1>

      <!-- homokóra -->
      <i v-if="loading" class="bi bi-hourglass-split fs-3"></i>
    </div>
    <!-- Paginátor -->
     <div class="d-flex align-items-center">
      <SetSelectedPerPage
      :useCollectionStore="useCollectionStore"
      />
       <Pagination class="ms-2"
       :useCollectionStore="useCollectionStore"
       :selectedPerPage="Number(selectedPerPage)"
       />
      </div>

    <!-- oldalanként hány sor választó -->

    <!-- Sportok táblázat CRUD -->
    <div>
      <ToastContainer />

      <!-- <div v-if="loading">Betöltés...</div> -->

      <!-- Táblázat -->
      <GenericTable
        :items="items"
        :columns="tableColumns"
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
import FormItem from "@/components/Forms/FormSport.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import SetSelectedPerPage from "@/components/Pagination/SetSelectedPerPage.vue";

export default {
  //módosítás
  name: "sports",
  components: {
    FormItem,
    Pagination,
    SetSelectedPerPage
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
      useCollectionStore: useSportStore,
    };
  },
  computed: {
    //módosítás
    ...mapState(useSportStore, ["item", "items", "loading", "error", "selectedPerPage"]),
    ...mapState(useSearchStore, ["searchWord"]),
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
    await this.getPaging(1, this.selectedPerPage);
    this.setSelectedPerPage(this.selectedPerPage);
  },
};
</script>

<style></style>
