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
    <FormSport 
      ref="form" 
      :title="title"
      :item="item"
      @formItem="formItemHandler"
    /> 
  </div>
</template>

<script>
//módosítás  
class Item {
  constructor(id=0, sportNev=''){
    this.id = id;
    this.sportNev = sportNev;
  }
}

import { mapActions, mapState } from "pinia";
import { useSearchStore } from "@/stores/searchStore";
//módosítás
import { useSportStore } from "@/stores/sportStore";
import FormSport from "@/components/Forms/FormSport.vue";

export default {
  name: "sports",
  //módosítás
  components: {
    FormSport
  },
  data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
      //módosítás
      pageTitle: "Sportok",
      // módosítás
      tableColumns: [
        { key: "id", label: "ID", debug: import.meta.env.VITE_DEBUG_MODE },
        { key: "sportNev", label: "Sportnév", debug: 2 },
      ],
      isOpenConfirmModal: false,
      selectedId: null,
      title: '',
      state: 'r', //'crud'
      item: new Item()
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
      this.state='c';
      console.log("create");
      this.title= "Új adatbevitel"
      this.item = new Item();
      this.$refs.form.show();

    },
    async updateHandler(id) {
      this.state='u';
      console.log("update:", id);
      this.title= "Adatmódosítás"
      

      this.$refs.form.show();
    },
    deleteHandler(id) {
      this.state='d';
      this.selectedId = id;
      this.isOpenConfirmModal = true;
    },
    async confirmHandler() {
      console.log("delete:", this.selectedId);
      //itt kell törölni a rekordot
      await this.delete(this.selectedId);
      await this.getAll();
      this.state = 'r';
      this.isOpenConfirmModal = false;
    },
    cancelHandler() {
      this.isOpenConfirmModal = false;
    },
    async formItemHandler(item){
      if (this.state === 'c') {
        //új rekord

      } else if(this.state === 'u') {
        //rekord módosítás
      }
    }
  },
  async mounted() {
    await this.getAll();
  },
};
</script>

<style>
</style>