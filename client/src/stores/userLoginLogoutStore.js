import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import service from "@/api/userLoginLogoutService";

export const useUserLoginLogoutStore = defineStore("userLoginLogout", {
  //Ezek a változók
  state: () => ({
    item: null,
    loading: false,
    error: null,
     toast: useToastStore(),
  }),
  //valamilyen formában visszaadja
  getters: {
    token() {
      if (!this.item) {
        return null;
      }
      return this.item.token;
    },
    role() {
      if (!this.item) {
        return null;
      }
      return this.item.role;
    },
    userName() {
      if (!this.item) {
        return null;
      }
      return this.item.name;
    },
    isLoggedIn() {
      return this.item != null ? true : false;
    },
  },
  //csinál vele valamit
  actions: {
    async login(data) {
      try {
        const response = await service.login(data);
        this.item = response.data;
        this.loading = true;
        return true;
      } catch (err) {
        this.toast.messages.push(`Login failed`);
        this.toast.show("Error");
        return false;
      }
    },
    async logout() {
      try {
        const toast = useToastStore();
        const response = await service.logout();
        this.item = null;
        this.loading = false;
        return true;
      } catch (err) {
        this.toast.messages.push(`Login failed`);
        this.toast.show("Error");
        return false;
      }
    },
  },
});
