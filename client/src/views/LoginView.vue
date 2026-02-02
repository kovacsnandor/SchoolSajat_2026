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
      await this.login(user);
      if (this.error) {
        return;
      }
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
