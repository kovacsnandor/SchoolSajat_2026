<template>
  <div class="d-flex justify-content-center my-4">
    <div class="card" style="width: 26rem">
      <div class="card-header text-bg-primary">Regisztráció</div>
      <div class="card-body">
        <form
          @submit.prevent="handleSubmit"
          :class="{ 'was-validated': validated }"
          novalidate
        >
          <!-- User név -->
          <div class="mb-3">
            <label for="userName" class="form-label">User neved:</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              v-model="userName"
              required
            />
            <div class="invalid-feedback">A user név kötelező</div>
          </div>
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
            <div class="invalid-feedback">
              A email kötelező, vagy nem szabályos
            </div>
          </div>
          <!-- Password1 -->
          <PasswordField
            class="mb-3"
            ref="pass1Comp"
            v-model="password"
            :label="'Jelszavad'"
            :inputRef="'firstInput'"
            :label-id="'password'"
          />
          <!-- Password2 -->
          <PasswordField
            ref="pass2Comp"
            v-model="confirmPassword"
            :label="'Jelszavad mégegyszer'"
            :inputRef="'confirmInput'"
            :label-id="'confirmPassword'"
            :passwordErrorMessage="passwordErrorMessage"
          />
          <button type="submit" class="btn btn-success">Regisztrálás</button>
          <button
            type="button"
            class="btn btn-primary ms-2"
            @click="this.$router.push('/login')"
          >
            Mégsem
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  </div>
</template>

<script>
import ToastContainer from "../Message/ToastContainer.vue";
import PasswordField from "./PasswordField.vue";
export default {
  name: "UserRegistration",
  components: {
    PasswordField,
    ToastContainer,
  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      validated: false,
      passwordErrorMessage: "",
    };
  },

  methods: {
    validatePasswords() {
      const comp2 = this.$refs.pass2Comp;
      const input2 = comp2?.$refs[comp2.inputRef];

      if (this.password !== this.confirmPassword) {
        // Ha nem egyeznek, hibát állítunk be (ezzel invalid lesz)
        input2.setCustomValidity("A jelszavak nem egyeznek!");
        //Ez a hibaüzenetet jelenítjük meg
        this.passwordErrorMessage = "A jelszavak nem egyeznek!";
      } else {
        // Ha egyeznek, töröljük a hibát (ezzel valid lesz)
        input2.setCustomValidity("");
        this.passwordErrorMessage = "";
      }
    },
    handleSubmit(event) {
      this.validatePasswords();
      const form = event.target;
      //Bekapcsolja a bootstrap hiba színező logikáját
      this.validated = true;

      if (form.checkValidity() === false) {
        console.log("Hiba:");
      } else {
        console.log("Sikeres validáció!");
        //user létrehozás
        const data = {
          name: this.userName,
          email: this.email,
          password: this.password,
        };
        this.$emit("createUser", data);
        setTimeout(() => {
          this.$router.push("/login");
        }, 3500);
      }
    },
  },
};
</script>

<style>
</style>