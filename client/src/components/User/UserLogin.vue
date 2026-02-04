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
              v-model="user.email"
              required
            />
            <div class="invalid-feedback">Az email üres, vagy helytelen</div>
          </div>
          <!-- Password -->
          <PasswordField
            class="mt-3"
            v-model="user.password"
            :label="'Jelszavad'"
          />
          <button type="submit" class="btn btn-success">Login</button>
          <RouterLink to="/registration" class="btn btn-primary ms-2"
            >Regisztráció</RouterLink
          >
        </form>
       
      </div>
    </div>
    <!-- hibaüzenet -->
  </div>
</template>

<script>
import PasswordField from "./PasswordField.vue";
import ToastContainer from "@/components/Message/ToastContainer.vue";
class User {
  constructor(email = "", password = "") {
    this.email = email;
    this.password = password;
  }
}
export default {
  name: "UserLogin",
  components: {
    PasswordField,
    ToastContainer,
  },
  data() {
    return {
      password: "",
      email: "",
      validated: false,
      user: new User(),
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
        this.$emit("logIn", this.user);
      }
    },
  },
};
</script>

<style>
</style>