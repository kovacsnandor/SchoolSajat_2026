import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import { useSearchStore } from "./searchStore";
import service from "@/api/schoolclassService";

//változtatás
class Item {
  constructor(id = 0, osztalyNev = "") {
    this.id = id;
    this.sportNev = osztalyNev;
  }
}

export const useSchoolclassStore = defineStore("schoolclass", {
  state: () => ({
    item: new Item(),
    items: [new Item()],
    loading: false,
    error: null,
    sortColumn: "id",
    sortDirection: "asc",
  }),
  actions: {
    clearItem() {
      this.item = new Item();
    },
    // READ - Összes adat lekérése
    async getAllAbc() {
      //   const toast = useToastStore();
      this.loading = true;
      try {
        const response = await service.getAllAbc();
        this.items = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async getAll() {
      //   const toast = useToastStore();
      this.loading = true;
      try {
        const response = await service.getAll();
        this.items = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    // READ - Egy adat lekérése
    async getById(id) {
      this.loading = true;
      //   const toast = useToastStore();
      try {
        const response = await service.getById(id);
        this.item = response.data;
      } catch (err) {
        this.error = err;
        // toast.messages.push(`User nem található`);
        // toast.show("Error");
      } finally {
        this.loading = false;
      }
    },

    // CREATE - Új elem hozzáadása
    async create(data) {
      this.loading = true;
      try {
        const newItem = await service.create(data);
        const searchStore = useSearchStore();
        const s =
          searchStore.searchWord && searchStore.searchWord.trim() !== ""
            ? searchStore.searchWord
            : "";

        const response = await service.getAll();
        this.items = response.data;
        // const toast = useToastStore();
        // toast.messages.push("User sikeresen létrehozva!");
        // toast.show("Success");
        return true;
      } catch (err) {
        console.log("új elem Error", err);
        // toast.messages.push(`Usert nem sikarült létrehozni`);
        // toast.show("Error");
        return false;
      } finally {
        this.loading = false;
      }
    },

    // 3. UPDATE - Módosítás (Helyi frissítéssel, újraolvasás nélkül)
    async update(id, updateData) {
      this.loading = true;
      try {
        const updatedItem = await service.update(id, updateData);

        const response = await service.getAll();
        this.items = response.data;
        // const toast = useToastStore();
        // toast.show("User sikeresen frissítve!", "Success");
        return true;
      } catch (err) {
        return false;
      } finally {
        this.loading = false;
      }
    },

    // 4. DELETE - Törlés
    async delete(id) {
      this.loading = true;
      try {
        await service.delete(id);

        const response = await service.getAll();
        this.items = response.data;
        // const toast = useToastStore();
        // toast.show("User törlés sikeres!", "Success");
        return false;
      } catch (err) {
        return true;
      } finally {
        this.loading = false;
      }
    },
  },
});
