<template>
  <div>
    <h1>Sportok</h1>
    <p v-if="debug != 0" class="my-debug">[{{ searchWord }}]</p>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useSearchStore } from "@/stores/searchStore";

export default {
  name: "sports",
  data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
    };
  },
  computed: {
    ...mapState(useSearchStore, ['searchWord'])
  },
};
</script>

<style>
</style>