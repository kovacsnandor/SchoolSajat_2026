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
              @input="clearError('name')"
              required
            />
            <div  v-if="!serverErrors.name" class="invalid-feedback">A user név kötelező</div>
            <div
              v-if="serverErrors.name"
              class="invalid-feedback d-block"
            >
              {{ serverErrors.name[0] }}
            </div>

          </div>
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email címed:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              @input="clearError('email')"
              required
            />
            <div v-if="!serverErrors.email" class="invalid-feedback">
              A email kötelező, vagy nem szabályos
            </div>
            <!-- 422-es hiba -->
            <div
              v-if="serverErrors.email"
              class="invalid-feedback d-block"
            >
              {{ serverErrors.email[0] }}
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
            :serverErrors="serverErrors"
          />
          <!-- Password2 -->
          <PasswordField
            ref="pass2Comp"
            v-model="confirmPassword"
            :label="'Jelszavad mégegyszer'"
            :inputRef="'confirmInput'"
            :label-id="'confirmPassword'"
            :passwordErrorMessage="passwordErrorMessage"
            :serverErrors="serverErrors"
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
      serverErrors: {}, // Itt tároljuk a szerver válaszát
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
        this.$emit("createUser", {
          data: data,
          done: (success) => {
            if (success) {
              this.$router.push("/login");
            } else {
              // Ha success === false, a modal nyitva marad a hibákkal
              console.log("Szerveroldali hiba, a modal marad");
            }
          },
        });
      }
    },
    //422-es hiba kezelés
    // View hívja, ha 422-es hiba van
    setServerErrors(errors) {
      this.serverErrors = errors;
    },
    //Mező (field) eltüntetése a serverErrors objektumból
    clearError(field) {
      if (this.serverErrors[field]) {
        delete this.serverErrors[field];
      }
    },
  },
};
</script>

<style></style>
