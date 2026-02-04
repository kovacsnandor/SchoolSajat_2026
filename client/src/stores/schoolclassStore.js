import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import { useSearchStore } from "./searchStore";
import service from "@/api/schoolclassService";

const toast = useToastStore();

//változtatás
class Item {
  constructor(id = 0, osztalyNev = "") {
    this.id = id;
    this.osztalyNev = osztalyNev;
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
    searchStore: useSearchStore(),
  }),
  actions: {
    clearItem() {
      this.item = new Item();
    },
    // READ - Összes adat lekérése
    async getAllAbc() {
      //   const toast = useToastStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await service.getAllAbc();
        this.items = response.data;
      } catch (err) {
        this.error = err;
        // toast.messages.push(`Az adatok nem töltődtek be`);
        // toast.show("Error");
        throw err;
      } finally {
        this.loading = false;
      }
    },
    //Ha a direction meg van aadva, akkor ez lesz a sorrend
    //Ha nincs megadva, akkor ellentettjére vált
    async getAllSortSearch(column = "id", direction = null) {
      //   const toast = useToastStore();
      this.loading = true;
      this.error = null;
      this.sortColumn = column;
      if (!direction) {
        direction =
          this.sortColumn === column && this.sortDirection === "asc"
            ? "desc"
            : "asc";
        this.sortDirection = direction;
      }
      try {
        const response = await service.getAllSortSearch(
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
      } catch (err) {
        this.error = err;
        // toast.messages.push(`Az adatok nem töltődtek be`);
        // toast.show("Error");
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async getAll() {
      //   const toast = useToastStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await service.getAll();
        this.searchStore.reset();
        this.items = response.data;
      } catch (err) {
        this.error = err;
        // toast.messages.push(`Az adatok nem töltődtek be`);
        // toast.show("Error");
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // READ - Egy adat lekérése
    async getById(id) {
      this.loading = true;
      this.error = null;
      //   const toast = useToastStore();
      try {
        const response = await service.getById(id);
        this.item = response.data;
      } catch (err) {
        this.error = err;
        // toast.messages.push(`Az adat nem található`);
        // toast.show("Error");
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // CREATE - Új elem hozzáadása
    async create(data) {
      this.loading = true;
      this.error = null;
      try {
        const newItem = await service.create(data);
        const response = await service.getAllSortSearch(
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
        toast.messages.push("Sikeresen létrehozva!");
        toast.show("Success");
        return true;
      } catch (err) {
        this.error = err;
        // toast.messages.push(`Létrehozás sikertelen`);
        // toast.show("Error");
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
        const response = await service.getAllSortSearch(
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
        toast.messages.push(`Sikeresen módosítva`);
        toast.show("Success");
        return true;
      } catch (err) {
        this.error = err;
        // toast.messages.push(`Módosítás Sikertelen`);
        // toast.show("Error");
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
        const response = await service.getAllSortSearch(
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
        toast.messages.push(`Sikeresen törölve`);
        toast.show("Success");
        return true;
      } catch (err) {
        this.error = err;
        // toast.messages.push(`Törlés sikertelen`);
        // toast.show("Error");
        throw err;
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
