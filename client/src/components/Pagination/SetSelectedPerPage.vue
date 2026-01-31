<template>
  <div class="d-flex align-items-center p-0">
    <label class="me-2" for="select">
      {{ label }}
    </label>
    <select
        id="select"
      v-model="selectedPerPage"
      class="form-select form-select-sm"
      style="width: auto"
    >
      <option :value="1000000">All</option>
      <option v-for="(p, index) in selectedPerPageList" :key="index" :value="p">
        {{ p }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SetSelectedPerPage",
  props: {
    useCollectionStore: { type: Function, required: true },
    label: { type: String, default: "Sor/oldal:" },
  },
  data() {
    return {
      store: null,
      selectedPerPage: 1000000,
      selectedPerPageList: [],
    };
  },
  watch: {
    selectedPerPage(value) {
      this.store.setSelectedPerPage(+value);
    },
  },
  created() {
    // Itt példányosítjuk a kapott store-t
    if (this.useCollectionStore) {
      this.store = this.useCollectionStore();
      this.selectedPerPageList = this.store.selectedPerPageList;
      this.selectedPerPage = this.store.selectedPerPageList[0];
    }
  },
};
</script>

<style></style>
