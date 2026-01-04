<template>
  <div class="d-flex justify-content-center my-4">
    <div class="card" style="width: 26rem">
      <div class="card-header text-bg-primary">Login vagy regisztráció</div>
      <div class="card-body">
        <form
          @submit.prevent="handleSubmit"
          :class="{ 'was-validated': validated }"
          novalidate
        >
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email címed:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
            />
            <div class="invalid-feedback">Az email üres, vagy helytelen</div>
          </div>
          <!-- Password -->
          <PasswordField class="mt-3" v-model="password" :label="'Jelszavad'" />
          <button type="submit" class="btn btn-success">Login</button>
          <RouterLink to="/registration" class="btn btn-primary ms-2"
            >Regisztráció</RouterLink
          >
        </form>
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
      validated: false,
    };
  },
  methods: {
    handleSubmit(event) {
      const form = event.target;
      //Bekapcsolja a bootstrap hiba színező logikáját
      this.validated = true;

      if (form.checkValidity() === false) {
        console.log("Hiba:");
      } else {
        console.log("Sikeres validáció!");
      }
    },
  },
};
</script>

<style>
</style>