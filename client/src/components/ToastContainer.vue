<template>
  <div class="alert alert-success" role="alert" v-if="messages.length">
    <div class="d-flex justify-content-between">
      <p v-for="m in messages" :key="m.id">
        {{ m.text }}
      </p>
      <i class="bi bi-x-lg my-pointer" @click="close()"></i>
    </div>
  </div>

  <!-- <div class="toast-container">
    <div v-for="m in messages" :key="m.id" :class="['toast', m.type]">
      {{ m.text }}
    </div>
  </div> -->
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useToastStore } from "@/stores/toastStore";

export default {
  computed: {
    ...mapState(useToastStore, ["messages"]),
    ...mapActions(useToastStore, ["close"]),
  },
};
</script>

<style scoped>
/* .toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
.toast {
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: white;
  transition: all 0.3s;
}
.success {
  background: #4caf50;
}
.error {
  background: #f44336;
} */
</style>