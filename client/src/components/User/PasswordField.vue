<template>
  <div class="mb-3">
    <label v-if="label" class="form-label" :for="labelId">{{ label }}: </label>
    <div class="input-group">
      <input
        :type="showPassword ? 'text' : 'password'"
        class="form-control"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        required
        :ref="inputRef"
        :id="labelId"
      />
      <button
        class="btn btn-outline-secondary ms-1"
        type="button"
        @click="showPassword = !showPassword"
      >
        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
      </button>
      <div class="invalid-feedback">
        {{ getErrorMessage() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: String },
    label: { type: String, default: "Jelszó" },
    inputRef: { type: String, default: "" },
    labelId: { type: String, default: "" },
  },
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    getErrorMessage() {
      const el = this.$refs[this.inputRef];
      // Ha a böngészőnek van egyedi üzenete, azt adjuk vissza
      if (el && el.validationMessage) {
        return el.validationMessage;
      }
      return "A jelszó kötelező";
    },
  },
};
</script>

<style>
</style>