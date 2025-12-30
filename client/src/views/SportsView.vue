<template>
  <div>
    <h1>Sportok</h1>
    <!-- Sportok táblázat CRUD -->
    <div>
      <ToastContainer />
      <p v-if="debug != 0" class="my-debug">[{{ searchWord }}]</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSearchStore } from "@/stores/searchStore";
import { useSportStore } from "@/stores/sportStore";
import ToastContainer from "@/components/Message/ToastContainer.vue";

export default {
  name: "sports",
  components: {
    ToastContainer,
  },
  data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
    };
  },
  computed: {
    ...mapState(useSportStore, ["items", "loading", "error"]),
    
    ...mapState(useSearchStore, ["searchWord"]),
  },
  methods: {
    ...mapActions(useSportStore, [
      "getAll",
      "getById",
      "create",
      "update",
      "delete",
    ]),
  },
  async mounted() {
    await this.getAll();
  },
};
</script>

<style>
</style>