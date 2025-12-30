<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <template v-for="col in columns">
            <th
              v-if="col.debug >= 1"
              :key="col.key"
              :class="{ 'my-debug': col.debug == 1 }"
            >
              {{ col.label }}
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
  },
  components: {
    ButtonsCrud,
  },
  data() {
    return {
      selectedId: null,
    };
  },
  methods: {
    onClickRow(id) {
      this.selectedId = id;
    },
  },
};
</script>

<style>
</style>