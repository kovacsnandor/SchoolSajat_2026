<template>
  <div>
    <UserRegistration ref="form" @createUser="createUserHandler" />
  </div>
</template>

<script>
import UserRegistration from "@/components/User/UserRegistration.vue";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "RegistrationView",
  components: {
    UserRegistration,
  },
  methods: {
    ...mapActions(useUserStore, ["create"]),
    async createUserHandler({ data, done }) {
      try {
        await this.create(data);
        done(true);
      } catch (err) {
        if (err.response && err.response.status === 422) {
          // Átadjuk a formnak a konkrét hibaüzeneteket (pl. "min 2 karakter")
          this.$refs.form.setServerErrors(err.response.data.errors);
          done(false); // Nyitva tartja a modalt
        } else {
          // Minden más hiba (500, 401) esetén is értesítjük a modalt, hogy ne záródjon be
          done(false);
        }
      }
    },
  },
};
</script>

<style></style>
