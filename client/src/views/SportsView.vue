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
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSearchStore } from "@/stores/searchStore";
import { useSportStore } from "@/stores/sportStore";

export default {
  name: "sports",
    data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
      pageTitle: "Sportok",
      // Itt definiálod, melyik kulcsokat akarod látni a Store-ból
      tableColumns: [
        { key: "id", label: "ID", debug: import.meta.env.VITE_DEBUG_MODE },
        { key: "sportNev", label: "Sportnév", debug: 2},
      ],
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
    createHandler(){
      console.log('create');
    },
    updateHandler(id){
      console.log('update:', id);
    },
    deleteHandler(id){
      console.log('delete:', id);
    },
  },
  async mounted() {
    await this.getAll();
    console.log(this.items);
  },
};
</script>

<style>
</style>