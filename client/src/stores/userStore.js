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
      this.error = null;
      try {
        const request = await service.getAll();
        this.items = request.data;
      } catch (err) {
        this.error = err;
        throw err;
        return false;
      } finally {
        this.loading = false;
      }
    },

    // READ - Egy adat lekérése
    async getById(id) {
      this.loading = true;
      this.error = null;
      const toast = useToastStore();
      try {
        const request = service.getById(id);
        this.item = await request.data;
      } catch (err) {
        this.error = err;
        toast.messages.push(`User nem található`);
        toast.show("Error");
        throw err;
        return false;
      } finally {
        this.loading = false;
      }
    },

    // CREATE - Új elem hozzáadása
    async create(data) {
      this.loading = true;
      this.error = null;
      const toast = useToastStore();
      try {
        const newItem = await service.create(data);
        const response = await service.getAll();
        this.items = response.data;
        toast.messages.push("User sikeresen létrehozva!");
        toast.show("Success");
        return true;
      } catch (err) {
        toast.messages.push(`Usert nem sikarült létrehozni`);
        toast.show("Error");
        this.error = err;
        throw err;
        return false;
      } finally {
        this.loading = false;
      }
    },

    // 3. UPDATE - Módosítás (Helyi frissítéssel, újraolvasás nélkül)
    async update(id, updateData) {
      this.loading = true;
      this.error = null;
      try {
        const updatedItem = await service.update(id, updateData);
        const response = await service.getAll();
        this.items = response.data;
        const toast = useToastStore();
        toast.show("User sikeresen frissítve!", "Success");
        return true;
      } catch (err) {
        this.error = err;
        throw err;
        return false;
      } finally {
        this.loading = false;
      }
    },

    // 4. DELETE - Törlés
    async delete(id) {
      this.loading = true;
      this.error = null;
      try {
        await service.delete(id);
        const response = await service.getAll();
        this.items = response.data;
        const toast = useToastStore();
        toast.show("User törlés sikeres!", "Success");
        return true;
      } catch (err) {
        this.error = err;
        throw err;
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
