<template>
  <div>
    <table class="generic-table">
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        <th>Műveletek</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="col in columns" :key="col.key">
          {{ item[col.key] }}
        </td>
        <td>
          <button @click="$emit('delete', item.id)">Törlés</button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
    props: {
    items: { type: Array, required: true },
    columns: { type: Array, required: true } // Pl: [{key: 'name', label: 'Név'}]
  }
}
</script>

<style>

</style>