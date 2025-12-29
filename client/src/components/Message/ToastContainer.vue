<template>
  <div 
     class="alert" 
     :class="{
      'alert-danger': type == 'Error',
      'alert-success': type == 'Success'
      }" 
    role="alert" v-if="messages.length"
    >
    <div class="d-flex justify-content-between">
      <h5>{{type}}</h5>
      <p v-for="message in messages" :key="message" class="m-0">
        {{ message }}
      </p>
      <i class="bi bi-x-lg my-pointer" @click="close()"></i>
    </div>
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
    ...mapState(useToastStore, ["messages", 'type']),
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