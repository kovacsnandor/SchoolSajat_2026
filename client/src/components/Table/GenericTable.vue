<template>
  <div class="d-flex justify-content-center table-responsive">
    <table class="table table-hover d-inline-block w-auto">
      <thead class="table-dark">
        <tr>
          <template v-for="col in columns">
            <th
              class="my-pointer"
              v-if="col.debug >= 1"
              :key="col.key"
              @click="$emit('sort', col.key)"
              :class="{ 'my-debug': col.debug == 1 }"
            >
              {{ col.label }}
              <span v-if="sortColumn === col.key">
                {{ sortDirection === "asc" ? "▲" : "▼" }}
              </span>
            </th>
          </template>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr
          v-for="item in items"
          :key="item.id"
          @click="onClickRow(item.id)"
          :class="{ 'table-primary': selectedId === item.id }"
        >
          <template v-for="col in columns">
            <td
              v-if="col.debug >= 1"
              :key="col.key"
              :class="{ 'my-debug': col.debug == 1 }"
            >
              {{ item[col.key] }}
            </td>
          </template>
          <td>
            <ButtonsCrud
              :id="item.id"
              @delete="$emit('delete', $event)"
              @update="$emit('update', $event)"
              @create="$emit('create', $event)"
            />
          </td>
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

<style></style>
