<template>
  <nav v-if="pagination.last_page > 1" class="mt-3">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: pagination.current_page === 1 }"
      >
        <button
          class="page-link"
          @click="getPaging(pagination.current_page - 1, selectedPerPage)"
        >
          &laquo;
        </button>
      </li>

      <li
        v-for="p in pagination.last_page"
        :key="p"
        class="page-item"
        :class="{ active: p === pagination.current_page }"
      >
        <button class="page-link" @click="getPaging(p, selectedPerPage)">
          {{ p }}
        </button>
      </li>

      <li
        class="page-item"
        :class="{ disabled: pagination.current_page === pagination.last_page }"
      >
        <button
          class="page-link"
          @click="getPaging(pagination.current_page + 1, selectedPerPage)"
        >
          &raquo;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapState } from "pinia";
export default {
  name: "Paginaiton",
  props: {
    useCollectionStore: { type: Function, required: true},
    selectedPerPage: { type: Number, default: 10 },
  },
  data(){
    return {
       store: null, 
    }
  },
  created() {
    // Itt példányosítjuk a kapott store-t
    if (this.useCollectionStore) {
      this.store = this.useCollectionStore();
    }
  },
  computed: {
    pagination() {
      return this.store ? this.store.pagination : {};
    }
  },
  methods: {
    async getPaging(page, perPage) {
      if (this.store) {
        await this.store.getPaging(page, perPage);
      }
    }
  },
};
</script>

<style></style>
