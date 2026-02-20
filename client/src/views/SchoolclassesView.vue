<template>
  <div>
    <p v-if="debug != 0" class="my-debug">Keresőszó: [{{ searchWord }}]</p>
    <!-- Az oldal fejléce -->
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
      <!-- Új adat felvitele gomb -->
      <ButtonsCrudCreate
        class="col-auto p-0"
        v-if="!loading"
        @create="createHandler"
      />
    </div>

    <!-- Táblázat CRUD -->
    <GenericTable
      :items="items"
      :columns="tableColumns"
      :useCollectionStore="useCollectionStore"
      @sort="handleSort"
      @create="createHandler"
      @update="updateHandler"
      @delete="deleteHandler"
    />

    <!-- Confirm modal: Kérdés törléskor -->
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
    // Ha változik a keresőszó, újra keresünk, de tartsuk meg a jelenlegi sorrendet
    searchWord(newValue) {
      this.getAllSortSearch(this.sortColumn, this.sortDirection);
    },
  },
  methods: {
    //módosítás
    ...mapActions(useSchoolclassStore, [
      "clearItem",
      "getAllSortSearch",
      "getAll",
      "getById",
      "create",
      "update",
      "delete",
    ]),
    ...mapActions(useSearchStore, ["reset"]),
    handleSort(column) {
      this.getAllSortSearch(column);
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
    async yesEventFormHandler({ item, done }) {
      try {
        if (this.state === "c") {
          //új rekord
          await this.create(item);
        } else if (this.state === "u") {
          //rekord módosítás
          await this.update(item.id, item);
        }
        // Ha ide eljut, sikeres volt a mentés
        this.state = "r";
        done(true); // Bezárja a modalt
      } catch (err) {
        // Ha 422-es hiba van (validáció)
        if (err.response && err.response.status === 422) {
          // Átadjuk a formnak a konkrét hibaüzeneteket (pl. "min 2 karakter")
          this.$refs.form.setServerErrors(err.response.data.errors);
          done(false); // Nyitva tartja a modalt
        } else {
          // Minden más hiba (500, 401) esetén is értesítjük a modalt, hogy ne záródjon be
          done(false);
        }
      }
    },
  },
  async mounted() {
    this.reset();
    await this.getAllSortSearch();
  },
};
</script>

<style></style>
