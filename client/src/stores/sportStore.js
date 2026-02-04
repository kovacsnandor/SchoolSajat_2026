import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import { useSearchStore } from "./searchStore";
import service from "@/api/sportService";

//változtatás
class Item {
  constructor(id = 0, sportNev = "") {
    this.id = id;
    this.sportNev = sportNev;
  }
}
class Pagination {
  constructor(current_page = 1, last_page = 1, total = 10) {
    this.current_page = current_page;
    this.last_page = last_page;
    this.total = total;
  }
}

export const useSportStore = defineStore("sport", {
  state: () => ({
    item: new Item(),
    items: [new Item()],
    pagination: new Pagination(),
    selectedPerPage: 10,
    selectedPerPageList: [10, 30, 50, 100],
    loading: false,
    error: null,
    sortColumn: "id",
    sortDirection: "asc",
    searchStore: useSearchStore(),
  }),
  actions: {
    async setSelectedPerPage(value) {
      this.selectedPerPage = value;
      this.loading = true;
      const response = await service.getPaging(1, value);
      this.items = response.data;
      this.pagination = response.meta;
      this.searchStore.reset();
      this.loading = false;
    },
    clearItem() {
      this.item = new Item();
    },
    // READ - Összes adat lekérése
    async getAll() {
      //   const toast = useToastStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await service.getAll();
        this.items = response.data;
        return true;
      } catch (err) {
        this.error = err;
        throw err;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async getAllAbc() {
      //   const toast = useToastStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await service.getAllAbc();
        this.items = response.data;
        return true;
      } catch (err) {
        this.error = err;
        throw err;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async getPaging(page = 1, per_page = 10, column = "id") {
      //   const toast = useToastStore();
      this.loading = true;
      if (page) {
        this.pagination.current_page = page;
      }
      if (per_page) {
        this.selectedPerPage = per_page;
      }
      if (column) {
        const direction =
          this.sortColumn === column && this.sortDirection === "asc"
            ? "desc"
            : "asc";
        this.sortColumn = column;
        this.sortDirection = direction;
      }
      this.error = null;
      try {
        const response = await service.getPaging(
          this.pagination.current_page,
          this.selectedPerPage,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
        this.pagination = response.meta;
        return true;
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
      //   const toast = useToastStore();
      this.error = null;
      try {
        const response = await service.getById(id);
        this.item = response.data;
        return true
      } catch (err) {
        this.error = err;
        // toast.messages.push(`User nem található`);
        // toast.show("Error");
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
      try {
        const newItem = await service.create(data);
        this.searchStore.reset();
        const response = await service.getPaging(
          this.pagination.current_page,
          this.selectedPerPage,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
        this.pagination = response.meta;
        // const toast = useToastStore();
        // toast.messages.push("User sikeresen létrehozva!");
        // toast.show("Success");
        return true;
      } catch (err) {
        // toast.messages.push(`Usert nem sikarült létrehozni`);
        // toast.show("Error");
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
        const response = await service.getPaging(
          this.pagination.current_page,
          this.selectedPerPage,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
        this.pagination = response.meta;
        // const toast = useToastStore();
        // toast.show("User sikeresen frissítve!", "Success");
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
        const response = await service.getPaging(
          this.pagination.current_page,
          this.selectedPerPage,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
        this.pagination = response.meta;
        // const toast = useToastStore();
        // toast.show("User törlés sikeres!", "Success");
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
