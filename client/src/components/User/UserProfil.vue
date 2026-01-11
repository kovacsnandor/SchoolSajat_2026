<template>
  <div>
    <div class="d-flex justify-content-center my-4">
      <div class="card" style="width: 26rem">
        <div class="card-header text-bg-primary">Profil adatok</div>
        <div class="card-body">
          <div class="d-flex">
            <span>User név: </span>
            <!-- read -->
            <span v-if="!modifyName">
                {{ user?.name }}
            </span>
            <button v-if="!modifyName"
              type="button"
              class="btn btn-outline-success ms-2"
              @click="modifyName = !modifyName"
            >
              <i class="bi bi-pencil"></i>
            </button>

            <!-- modify -->
            <input type="text" class="form-control" id="exampleFormControlInput1"
                v-if="modifyName"
                v-model="user.name"
            >
            <button v-if="modifyName"
              type="button"
              class="btn btn-outline-success ms-2"
              @click="modifyName = !modifyName"
            >
              <i class="bi bi-escape"></i>
            </button>

          </div>
          <div>Email: {{ user?.email }}</div>
          <button type="button" class="btn btn-danger">Jelszó módosítás</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfil",
  props: {
    user: { require: true },
  },
  data() {
    return {
      modifyName: false,
    };
  },
};
</script>

<style>
</style>