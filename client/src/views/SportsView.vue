<template>
  <div>
    <h1>{{ pageTitle }}</h1>

    <!-- Sportok táblázat CRUD -->
    <div>
      <ToastContainer />
      <p v-if="debug != 0" class="my-debug">Keresőszó: [{{ searchWord }}]</p>

      <div v-if="loading">Betöltés...</div>

      <!-- Táblázat -->
      <GenericTable
        v-else
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
    <FormSport/> 
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSearchStore } from "@/stores/searchStore";
import { useSportStore } from "@/stores/sportStore";
import FormSport from "@/components/Forms/FormSport.vue";

export default {
  name: "sports",
  components: {
    FormSport
  },
  data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
      pageTitle: "Sportok",
      // Itt definiálod, melyik kulcsokat akarod látni a Store-ból
      tableColumns: [
        { key: "id", label: "ID", debug: import.meta.env.VITE_DEBUG_MODE },
        { key: "sportNev", label: "Sportnév", debug: 2 },
      ],
      isOpenConfirmModal: false,
      selectedId: null,
    };
  },
  computed: {
    ...mapState(useSportStore, ["items", "loading", "error"]),

    ...mapState(useSearchStore, ["searchWord"]),
  },
  methods: {
    ...mapActions(useSportStore, [
      "getAll",
      "getById",
      "create",
      "update",
      "delete",
    ]),
    createHandler() {
      console.log("create");
    },
    updateHandler(id) {
      console.log("update:", id);
    },
    deleteHandler(id) {
      this.selectedId = id;
      this.isOpenConfirmModal = true;
    },
    confirmHandler() {
      console.log("delete:", this.selectedId);
      this.isOpenConfirmModal = false;
    },
    cancelHandler() {
      this.isOpenConfirmModal = false;
    },
  },
  async mounted() {
    await this.getAll();
  },
};
</script>

<style>
</style>