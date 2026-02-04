<template>
  <div>
    <UserLogin @logIn="loginHandler" />
  </div>
</template>

<script>
import UserLogin from "@/components/User/UserLogin.vue";
import { mapActions, mapState, mapStores } from "pinia";
import { useUserLoginLogoutStore } from "@/stores/userLoginLogoutStore";
export default {
  name: "LoginView",
  components: {
    UserLogin,
  },
  computed: {
    ...mapState(useUserLoginLogoutStore, ["error"]),
  },
  methods: {
    ...mapActions(useUserLoginLogoutStore, ["login"]),
    async loginHandler(user) {
      try {
        //Sikeres bejelentkezés
        await this.login(user);
        this.$router.push("/");
        
      } catch (error) {
        console.log("A bejelentkezés sikertelen, az interceptor már kezelte.");
      }
    },
  },
};
</script>

<style></style>
