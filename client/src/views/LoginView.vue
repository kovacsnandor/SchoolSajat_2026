<template>
  <div>
    <UserLogin @logIn="loginHandler" />
  </div>
</template>

<script>
import UserLogin from "@/components/User/UserLogin.vue";
import { mapActions, mapState } from "pinia";
import { useUserLoginLogoutStore } from "@/stores/userLoginLogoutStore";
export default {
  name: "LoginView",
  components: {
    UserLogin,
  },
  methods: {
    ...mapActions(useUserLoginLogoutStore, ["login"]),
    async loginHandler(user) {
      await this.login(user);
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>