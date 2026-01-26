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
    rolNames: ['Admin', 'Tanár', 'Diák']
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
    userNameWithRole() {
      if (!this.item) {
        return null;
      }
      const userInfo = `${this.item.name}: ${this.rolNames[(this.item.role-1)]}`
      return userInfo;
    },
    isLoggedIn() {
      return this.item != null ? true : false;
    },
  },
  //csinál vele valamit
  actions: {
    canAccess(requiredRoles) {
      // Itt a 'this' kulcsszóval éred el a state-et
      if (!requiredRoles || requiredRoles.length === 0) return true;
      if (!this.isLoggedIn) return false;
      return requiredRoles.includes(this.role);
    },
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
    async getMeRefresh() {
      try {
        const response = await service.getMeRefresh();
        this.item.name = response.data.name;
        this.item.email = response.data.email;
        this.loading = true;
        return true;
      } catch (err) {
        this.toast.messages.push(`Ferfesh failed`);
        this.toast.show("Error");
        return false;
      }
    },
  },
});
