<template>
    
  <div class="d-flex justify-content-center my-4">
    <div class="card" style="width: 26rem">
      <div class="card-header">Login vagy regisztráció</div>
      <div class="card-body">
        <!-- Email -->
        <label for="email" class="form-label">Email címed:</label>
        <input type="email" class="form-control" id="email" v-model="email" />
        <!-- Password -->
        <PasswordField class="mt-3" v-model="password" :label="'Jelszavad'" />
        <button type="button" class="btn btn-success">Login</button>
        <RouterLink to="/registration" class="btn btn-primary ms-2">Regisztráció</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordField from "./PasswordField.vue";
export default {
  name: "UserLogin",
  components: {
    PasswordField,
  },
  data() {
    return {
      password: "",
      email: "",
    };
  },
};
</script>

<style>
</style>