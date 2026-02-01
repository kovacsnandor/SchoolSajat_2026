<template>
  <div
    class="table-responsive my-table-container"
    style="max-height: calc(100vh - 360px); overflow-y: auto"
  >
    <table class="table table-hover w-auto mx-auto">
      <thead class="table-dark sticky-top" style="z-index: 10; top: 0">
        <tr class="align-middle text-center">
          <th>Műveletek</th>
          <template v-for="col in columns">
            <th
              class="my-pointer"
              v-if="col.debug >= 1"
              :key="col.key"
              @click="$emit('sort', col.key)"
              :class="{ 'my-debug': col.debug == 1 }"
            >
              <div
                class="d-flex align-items-center justify-content-center text-nowrap"
              >
                <span>{{ col.label }}</span>
                <span
                  :class="{ invisible: sortColumn !== col.key }"
                  class="ms-1"
                >
                  {{ sortDirection === "asc" ? "▲" : "▼" }}
                </span>
              </div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr
          v-for="item in items"
          :key="item.id"
          @click="onClickRow(item.id)"
          :class="{ 'table-primary': selectedId === item.id }"
        >
          <td>
            <ButtonsCrud
              :id="item.id"
              @delete="$emit('delete', $event)"
              @update="$emit('update', $event)"
              @create="$emit('create', $event)"
            />
          </td>
          <template v-for="col in columns">
            <td
              v-if="col.debug >= 1"
              :key="col.key"
              :class="{ 'my-debug': col.debug == 1 }"
            >
              {{ item[col.key] }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ButtonsCrud from "./ButtonsCrud.vue";

export default {
  name: "GenericTable",
  props: {
    items: { type: Array, required: true },
    columns: { type: Array, required: true }, // Pl: [{key: 'name', label: 'Név', debug: false}]
    useCollectionStore: { type: Function, required: true },
  },
  components: {
    ButtonsCrud,
  },
  data() {
    return {
      selectedId: null,
      store: null, // Itt tároljuk a példányosított store-t
    };
  },
  created() {
    if (this.useCollectionStore) {
      this.store = this.useCollectionStore();
    }
  },
  computed: {
    // Ezeket a store-ból húzzuk be reaktívan
    sortColumn() {
      return this.store ? this.store.sortColumn : "";
    },
    sortDirection() {
      return this.store ? this.store.sortDirection : "asc";
    },
  },
  methods: {
    onClickRow(id) {
      this.selectedId = id;
    },
  },
};
</script>

<style scoped>
/* Ez a titkos szósz a sticky fejléc stabilizálásához */
.my-table-container {
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

/* Megakadályozza, hogy görgetéskor "átlátszanak" a betűk a fekete fejléc alatt */
/* .sticky-top th {
  background-color: #212529 !important;
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.15);
} */

/* Ha a táblázat keskenyebb mint a képernyő, de középre akarod tenni */
.table {
  margin-left: auto;
  margin-right: auto;
  width: auto !important; /* Csak akkor, ha nem akarod, hogy kifeszüljön */
}
</style>
