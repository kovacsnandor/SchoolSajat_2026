<template>
  <div
    class="alert alert-primary alert-dismissible fade show custom-center-alert"
    :class="{
      'alert-danger': type == 'Error',
      'alert-success': type == 'Success',
    }"
    role="alert"
    v-if="messages.length"
  >
    <div class="mb-2">
      <h5>{{ type }}</h5>
      <p v-for="message in messages" :key="message" class="m-0">
        {{ message }}
      </p>
      <!-- <i class="bi bi-x-lg my-pointer ms-3" @click="close()"></i> -->
    </div>
    <button type="button" class="btn-close" @click="close()" aria-label="Close"></button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useToastStore } from "@/stores/toastStore";

export default {
  methods: {
    ...mapActions(useToastStore, ["close"]),
  },
  computed: {
    ...mapState(useToastStore, ["messages", "type"]),
  },
};
</script>

<style scoped>
.custom-center-alert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050; /* Hogy biztosan minden felett legyen */
  min-width: 300px; /* Opcionális: ne legyen túl összenyomva */
  /* Egyedi, lágyabb árnyék */
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.05);
}
</style>
