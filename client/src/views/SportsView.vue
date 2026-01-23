<template>
  <div>
    <h1>{{ pageTitle }} 
      <!-- <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> -->
      <i v-if="loading"  class="bi bi-hourglass-split"></i>
    </h1>

    <!-- Sportok táblázat CRUD -->
    <div>
      <ToastContainer />
      <p v-if="debug != 0" class="my-debug">Keresőszó: [{{ searchWord }}]</p>

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
import FormItem from "@/components/Forms/FormSport.vue";

export default {
  //módosítás
  name: "sports",
  components: {
    FormItem
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
      title: '',
      state: 'r', //'crud'
    };
  },
  computed: {
    //módosítás
    ...mapState(useSportStore, ["item", "items", "loading", "error"]),
    ...mapState(useSearchStore, ["searchWord"]),
  },
  methods: {
    //módosítás
    ...mapActions(useSportStore, [
      "clearItem",
      "getAll",
      "getPaging",
      "getById",
      "create",
      "update",
      "delete",
    ]),
    createHandler() {
      this.state='c';
      console.log("create");
      this.title= "Új adatbevitel"
      this.clearItem();
      this.$refs.form.show();

    },
    async updateHandler(id) {
      this.state='u';
      console.log("update:", id);
      this.title= "Adatmódosítás"
      await this.getById(id);
      this.$refs.form.show();
    },
    deleteHandler(id) {
      this.state='d';
      this.selectedId = id;
      this.isOpenConfirmModal = true;
    },
    async confirmHandler() {
      await this.delete(this.selectedId);
      this.state = 'r';
      this.isOpenConfirmModal = false;
    },
    cancelHandler() {
      this.isOpenConfirmModal = false;
    },
    async yesEventFormHandler(item){
      if (this.state === 'c') {
        //új rekord
        console.log("új rekord");
        await this.create(item);
        this.state = 'r';
      } else if(this.state === 'u') {
        //rekord módosítás
        console.log("rekord módosítás");
        await this.update(item.id, item);
        this.state = 'r';
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