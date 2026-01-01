<template>
  <div class="d-flex justify-content-center my-4">
    <div class="card" style="width: 26rem">
      <div class="card-header">Regisztráció</div>
      <div class="card-body">
        <form
          @submit.prevent="handleSubmit"
          :class="{ 'was-validated': validated }"
          novalidate
        >
          <!-- User név -->
          <label for="userName" class="form-label">User neved:</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            v-model="userName"
            required
          />
          <div class="invalid-feedback">A user név kötelező</div>
          <!-- Email -->
          <label for="email" class="form-label">Email címed:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
          />
          <div class="invalid-feedback">
            A email kötelező, vagy nem szabályos
          </div>
          <!-- Password1 -->
          <PasswordField
            class="mt-3"
            ref="pass1Comp"
            v-model="password"
            :label="'Jelszavad'"
            :inputRef="'firstInput'"
            :label-id="'password'"
          />
          <!-- Password2 -->
          <PasswordField
            class="mt-3"
            ref="pass2Comp"
            v-model="confirmPassword"
            :label="'Jelszavad mégegyszer'"
            :inputRef="'confirmInput'"
            :label-id="'confirmPassword'"
          />
          <button type="submit" class="btn btn-success">Regisztrálás</button>
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
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      validated: false,
    };
  },
  watch: {
    // Figyeljük mindkét jelszó mezőt
    confirmPassword() {
      this.validatePasswords();
    },
    password() {
      this.validatePasswords();
    },
  },
  methods: {
    validatePasswords() {
      // const input = this.$refs.confirmInput.$el.querySelector("input");
      // console.log('input',input);

      const comp1 = this.$refs.pass1Comp;
      const comp2 = this.$refs.pass2Comp;
      const input1 = comp1?.$refs[comp1.inputRef];
      const input2 = comp2?.$refs[comp2.inputRef];

      if (!input1 || !input2) return;

      if (this.password !== this.confirmPassword) {
        // Ha nem egyeznek, hibaüzenetet állítunk be (ezzel invalid lesz)
        input2.setCustomValidity("A jelszavak nem egyeznek!");
      } else {
        // Ha egyeznek, töröljük a hibát (ezzel valid lesz)
        input2.setCustomValidity("");
      }
    },
    handleSubmit(event) {
      this.validatePasswords();
      const form = event.target;
      this.validated = true;

      if (form.checkValidity() === false) {
        event.preventDefault();
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