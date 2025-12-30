<template>
  <Transition name="modal-fade">
    <div v-if="isOpenConfirmModal">
      <div class="modal fade show" tabindex="-1" style="display: block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-light shadow-lg">
            <div class="modal-header bg-info">
              <h5 class="modal-title">
                {{ title }}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="$emit('cancel')"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                {{ message }}
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="$emit('cancel')"
              >
                {{ cancel }}
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="$emit('confirm')"
              >
                {{ confirm }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    isOpenConfirmModal: Boolean,
    title: { type: String, default: "Megerősítés" },
    message: {
      type: String,
      default: "Biztosan törölni szeretnéd ezt az elemet?",
    },
    cancel: { type: String, default: "Nem" },
    confirm: { type: String, default: "Igen" },
  },
};
</script>

<style scoped>
/* Megjelenési fázis (enter) és eltűnési fázis (leave) */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

/* A belső ablak (modal-dialog) külön animálása: fentről lefelé úszás */
.modal-fade-enter-active .modal-dialog,
.modal-fade-leave-active .modal-dialog {
  transition: transform 0.3s ease-out;
}

/* Kiinduló és végállapot (amikor nincs a képernyőn) */
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-dialog,
.modal-fade-leave-to .modal-dialog {
  transform: translateY(-20px);
}
</style>