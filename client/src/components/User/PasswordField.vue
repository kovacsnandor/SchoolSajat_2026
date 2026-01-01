<template>
  <div class="mb-3">
    <label v-if="label" class="form-label">{{ label }}: </label>
    <div class="input-group">
      <input 
        :type="showPassword ? 'text' : 'password'" 
        class="form-control" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <button 
        class="btn btn-outline-secondary ms-1" 
        type="button" 
        @click="showPassword = !showPassword"
      >
        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
props: {
    modelValue: { type: String},
    label: { type: String, default: "Jelszó" },
  },
  data(){
    return {
      showPassword: false
    }
  }
}
</script>

<style>

</style>