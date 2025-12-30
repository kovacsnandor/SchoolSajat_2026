<template>
  <div class="d-flex">
    <ButtonsCrudDelete
      class="ms-2"
      :id="id"
      @delete="$emit('delete', $event)"
    />
    <ButtonsCrudUpdate
      class="ms-2"
      :id="id"
      @update="$emit('update', $event)"
    />
    <ButtonsCrudCreate class="ms-2" @create="$emit('create', $event)" />
  </div>
</template>

<script>
import ButtonsCrudCreate from "./ButtonsCrudCreate.vue";
import ButtonsCrudDelete from "./ButtonsCrudDelete.vue";
import ButtonsCrudUpdate from "./ButtonsCrudUpdate.vue";
export default {
  name: "ButtonsCrud",
  components: {
    ButtonsCrudCreate,
    ButtonsCrudDelete,
    ButtonsCrudUpdate,
  },
  props: {
    id: { type: Number, required: true },
  },
};
</script>

<style>
</style>