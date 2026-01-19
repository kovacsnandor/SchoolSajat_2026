<template>
  <div>
    <div class="d-flex justify-content-center my-4">
      <div class="card" style="width: 32rem">
        <div class="card-header text-bg-primary">Profil adatok</div>
        <!-- card body -->
        <div class="card-body">
          <EditableField
            type="text"
            label="User név:"
            :initialValue="user?.name"
            :loading="loadingStates.name"
            :required="true"
            @save="$emit('saveField', { field: 'name', value: $event })"
            ref="nameField"
          />

          <EditableField
            type="email"
            label="Email:"
            :initialValue="user?.email"
            :loading="loadingStates.email"
            :required="true"
            @save="$emit('saveField', { field: 'email', value: $event })"
            ref="nameField"
          />

          <button type="button" class="btn btn-danger mt-5">Jelszó módosítás</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditableField from "./EditableField.vue";
export default {
  name: "UserProfil",
  emits: ['saveField'],
  components: {
    EditableField,
  },
  props: {
    user: { require: true },
    loadingStates: { require: true },
  },
  data() {
    return {
      modifyName: false,
    };
  },
};
</script>

<style></style>
