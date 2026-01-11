import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import service from "@/api/userMeService";

export const useUserLoginLogoutStore = defineStore("userMe", {
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
    async getMe() {
      try {
        const response = await service.getMe();
        this.item = response.data;
        this.loading = true;
        return true;
      } catch (err) {
        this.toast.messages.push(`Az adatok betöltése sikertelen`);
        this.toast.show("Error");
        return false;
      }
    },
    async updateMe(data) {
      try {
        const response = await service.updateMe(data);
        this.item = response.data;
        this.loading = true;
        this.toast.messages.push(`Az adatmódosítás sikerült`);
        this.toast.show("Success");
        await this.getMe();
        return true;
      } catch (err) {
        this.toast.messages.push(`Update failed`);
        this.toast.show("Error");
        return false;
      }
    },
    async updatePassword(data) {
      try {
        const response = await service.updatePassword(data);
        this.item = response.data;
        this.loading = true;
        this.toast.messages.push(`Jelszó módosítás sikeres`);
        this.toast.show("Success");
        return true;
      } catch (err) {
        this.toast.messages.push(`Jelszó módosítás meghiúsult`);
        this.toast.show("Error");
        return false;
      }
    },
    async deleteMe() {
      try {
        const response = await service.deleteMe();
        this.item = response.data;
        this.loading = true;
        this.toast.messages.push(`A profil törlődött`);
        this.toast.show("Success");
        return true;
      } catch (err) {
        this.toast.messages.push(`Get me failed`);
        this.toast.show("Error");
        return false;
      }
    },
  },
});
