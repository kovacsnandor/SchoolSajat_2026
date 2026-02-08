<template>
  <nav v-if="pagination.last_page > 1">
    <ul class="pagination m-0">
      <!-- firs -->
      <li
        class="page-item"
        :class="{ disabled: pagination.current_page === 1 }"
      >
        <button
          class="page-link"
          @click="
            getPaging(1)
          "
          title="Első oldal"
        >
          &laquo;&laquo;
        </button>
      </li>
      <!-- Previous -->
      <li
        class="page-item"
        :class="{ disabled: pagination.current_page === 1 }"
      >
        <button
          class="page-link"
          @click="getPaging(pagination.current_page - 1)"
        >
          &laquo;
        </button>
      </li>
      <!-- numbers -->
      <li
        v-for="p in pagination.last_page"
        :key="p"
        class="page-item"
        :class="{ active: p === pagination.current_page }"
      >
        <button
          class="page-link"
          @click="
            getPaging(p)
          "
        >
          {{ p }}
        </button>
      </li>
      <!-- next -->
      <li
        class="page-item"
        :class="{ disabled: pagination.current_page === pagination.last_page }"
      >
        <button
          class="page-link"
          @click="getPaging(pagination.current_page + 1)"
        >
          &raquo;
        </button>
      </li>
      <!-- last -->
      <li
        class="page-item"
        :class="{ disabled: pagination.current_page === pagination.last_page }"
      >
        <button
          class="page-link"
          @click="
            getPaging(pagination.last_page)"
          title="Utolsó oldal"
        >
          &raquo;&raquo;
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
    useCollectionStore: { type: Function, required: true },
  },
  data() {
    return {
      store: null,
    };
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
    },
  },
  methods: {
    async getPaging(page) {
      if (this.store) {
        await this.store.getPaging(page);
      }
    },
  },
};
</script>

<style></style>
