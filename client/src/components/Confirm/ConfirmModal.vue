<template>
  <div class="modal" tabindex="-1" v-if="isOpen">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
            {{ title }}
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>
            {{ message }}
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="$emit=('cancel')"
        >
            {{ cancel }}
        </button>
        <button type="button" class="btn btn-primary"
            @click="$emit=('confirm')"
        >
            {{ confirm }}
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
    isOpen: Boolean,
    title: { type: String, default: 'Megerősítés' },
    message: { type: String, default: 'Biztosan törölni szeretnéd ezt az elemet?' },
    cancel: {type: String, default: "Nem"},
    confirm: {type: String, default: "Igen"},
    }
}
</script>

<style>

</style>