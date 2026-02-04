import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import service from "@/api/userMeService";

export const useUserMeStore = defineStore("userMe", {
  //Ezek a változók
  state: () => ({
    item: null,
    loading: false,
    error: null,
    toast: useToastStore(),
  }),
  //valamilyen formában visszaadja
  getters: {
    userName() {
      if (!this.item) {
        return null;
      }
      return this.item.name;
    },
    email() {
      if (!this.item) {
        return null;
      }
      return this.item.email;
    },
  },
  //csinál vele valamit
  actions: {
    async getMe() {
      try {
        this.loading = true;
        this.error = null;
        const response = await service.getMe();
        this.item = response.data;
        return true;
      } catch (err) {
        this.error = err;
        this.toast.messages.push(`Az adatok betöltése sikertelen`);
        this.toast.show("Error");
        throw err;
        return false;
      }
    },
    async updateMe(data) {
      try {
        this.item = response.data;
        this.loading = true;
        const response = await service.updateMe(data);
        this.error = null;
        this.toast.messages.push(`Az adatmódosítás sikerült`);
        this.toast.show("Success");
        await this.getMe();
        return true;
      } catch (err) {
        this.error = err;
        this.toast.messages.push(`Update failed`);
        this.toast.show("Error");
        throw err;
        return false;
      }
    },
    async updatePassword(data) {
      try {
        const response = await service.updatePassword(data);
        this.item = response.data;
        this.loading = true;
        this.error = null;
        this.toast.messages.push(`Jelszó módosítás sikeres`);
        this.toast.show("Success");
        return true;
      } catch (err) {
        this.error = err;
        this.toast.messages.push(`Jelszó módosítás meghiúsult`);
        this.toast.show("Error");
        throw err;
        return false;
      }
    },
    async deleteMe() {
      try {
        const response = await service.deleteMe();
        this.item = response.data;
        this.loading = true;
        this.error = null;
        this.toast.messages.push(`A profil törlődött`);
        this.toast.show("Success");
        return true;
      } catch (err) {
        this.error = err;
        this.toast.messages.push(`Get me failed`);
        this.toast.show("Error");
        throw err;
        return false;
      }
    },
  },
});
