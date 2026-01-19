<template>
  <div class="mt-4">
    <div class="d-flex align-items-center">
      <label for="name" class="form-label text-nowrap m-0">{{ label }} </label>
      <!-- read -->
      <div
        class="d-flex align-items-center justify-content-between flex-grow-1"
        v-if="!modify"
      >
        <span class="ms-2">
          {{ initialValue || "---" }}
        </span>
        <!-- edit -->
        <button
          v-if="!modify"
          type="button"
          class="btn btn-outline-success ms-2"
          @click="startEdit"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </div>

      <!-- modify -->
      <div
        class="d-flex align-items-center justify-content-between flex-grow-1"
        v-if="modify"
      >
        <input
          :type="type"
          class="form-control ms-2"
          :class="{ 'is-invalid': showError }"
          id="name"
          v-model="tempValue"
          :disabled="loading"
          @keyup.enter="saveEdit"
          @keyup.esc="cancelEdit"
          ref="inputField"
        />
        <!-- save -->
        <button
          type="button"
          class="btn btn-outline-success ms-2"
          @click="saveEdit"
          :disabled="loading || (required && !tempValue)"
        >
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm"
            role="status"
          ></span>

          <i v-else class="bi bi-floppy"></i>
        </button>
        <!-- escape -->
        <button
          type="button"
          class="btn btn-outline-success ms-2"
          @click="cancelEdit"
          :disabled="loading"
        >
          <i class="bi bi-escape"></i>
        </button>
      </div>
    </div>
    <div v-if="showError" class="invalid-feedback d-block">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialValue: { type: [String, Number] },
    label: { type: String, default: "Adat:" },
    type: { type: String, default: "text" },
    required: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
  emits: ["save"],
  data() {
    return {
      modify: false,
      tempValue: null,
      validated: false,
    };
  },
  computed: {
    isInvalidEmail() {
      if (this.type === "email" && this.tempValue) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailPattern.test(this.tempValue);
      }
      return false;
    },

    // Akkor mutatunk hibát, ha kötelező, üres, és már megnyomták a mentést
    showError() {
      if (!this.validated) {
        return false;
      }
      const isEmpty = this.required && !this.tempValue?.toString().trim();
      return isEmpty || this.isInvalidEmail;
    },
    errorMessage() {
      if (this.required && !this.tempValue?.toString().trim()) {
        return "A mező kitöltése kötelező!";
      }
      if (this.isInvalidEmail) {
        return "Kérjük, adjon meg egy érvényes email címet!";
      }
      return "";
    },
  },
  watch: {
    tempValue(value) {
      if (!value) {
        this.validated = true;
      } else {
        this.validated = false;
      }
    },
    // Ha a mentés sikeresen befejeződött (loading false-ra vált)
    // és közben bezárult a szerkesztő, alaphelyzetbe állítjuk a validációt
    loading(newVal) {
      if (!newVal && !this.modify) {
        this.validated = false;
      }
    },
  },
  methods: {
    startEdit() {
      this.tempValue = this.initialValue;
      this.validated = false;
      this.modify = true;
      // Kis késleltetés, hogy az input megnyíljon, mielőtt fókuszba kerül
      this.$nextTick(() => this.$refs.inputField.focus());
    },
    saveEdit() {
      this.validated = true;
      if (this.showError) {
        return;
      }
      this.$emit("save", this.tempValue);
      this.modify = false;
    },
    cancelEdit() {
      this.modify = false;
      this.validated = false;
    },
  },
};
</script>

<style></style>
