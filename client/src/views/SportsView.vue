<template>
  <div>
    <h1>Sportok</h1>
    <ToastContainer/>
    <p v-if="debug != 0" class="my-debug">[{{ searchWord }}]</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSearchStore } from "@/stores/searchStore";
import { useSportStore } from "@/stores/sportStore";
import ToastContainer from "@/components/Message/ToastContainer.vue";

export default {
  name: "sports",
  data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
    };
  },
  computed: {
    ...mapState(useSearchStore, ['searchWord']),
    ...mapState(useSportStore, ['items', 'loading', 'error']),
  },
  methods: {
    ...mapActions(useSportStore,['getAll', 'getById', 'create', 'update', 'delete'])
  },
  async mounted(){
    await this.getAll();
    console.log('getAll',this.items.data);
    await this.getById(1111);
    console.log('getjById',this.items.data);
  }
};
</script>

<style>
</style>