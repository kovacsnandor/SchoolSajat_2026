// import { createTableStore } from './genericStore';
import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import service from "@/api/userService";

// Csak átadod a Store nevét és a hozzá tartozó Service-t
// export const useUserStore = createTableStore('users', service);

//változtatás
class Item {
  constructor(id = 0, name = "", email = "", role = 3, token = "") {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}

export const useUserStore = defineStore("user", {
  state: () => ({
    item: new Item(),
    items: [new Item()],
    loading: false,
    error: null,
  }),
  actions: {
    // READ - Összes adat lekérése
    async getAll() {
      const toast = useToastStore();
      this.loading = true;
      try {
        const request = await service.getAll();
        this.items = request.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    // READ - Egy adat lekérése
    async getById(id) {
      this.loading = true;
      const toast = useToastStore();
      try {
        const request = service.getById(id);
        this.item = await request.data;
      } catch (err) {
        this.error = err;
        toast.messages.push(`User nem található`);
        toast.show("Error");
      } finally {
        this.loading = false;
      }
    },

    // CREATE - Új elem hozzáadása
    async create(data) {
      try {
        const newItem = await service.create(data);
        this.items.push(newItem);

        const toast = useToastStore();
        toast.messages.push("User sikeresen létrehozva!");
        toast.show("Success");
        return true;
      } catch (err) {
        toast.messages.push(`Usert nem sikarült létrehozni`);
        toast.show("Error");
        return false;
      }
    },

    // 3. UPDATE - Módosítás (Helyi frissítéssel, újraolvasás nélkül)
    async update(id, updateData) {
      try {
        const updatedItem = await service.update(id, updateData);

        // Megkeressük az elem helyét a listában
        const index = this.items.findIndex((item) => item.id === id);

        if (index !== -1) {
          // A splice-szal garantáljuk, hogy a Vue azonnal észrevegye a változást
          this.items.splice(index, 1, updatedItem);
        }

        const toast = useToastStore();
        toast.show("User sikeresen frissítve!", "Success");
        return true;
      } catch (err) {
        return false;
      }
    },

    // 4. DELETE - Törlés
    async delete(id) {
      try {
        await service.delete(id);
        this.items = this.items.filter((item) => item.id !== id);

        const toast = useToastStore();
        toast.show("User törlés sikeres!", "Success");
        return true;
      } catch (err) {
        return false;
      }
    },
  },
});
