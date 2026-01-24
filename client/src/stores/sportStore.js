import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
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
    selectedPerPageList: [10,30,50,100],
    loading: false,
    error: null,
  }),
  actions: {
    async setSelectedPerPage(value) {
      this.selectedPerPage = value;
      console.log('ffffffffff', this.selectedPerPage);
      
      const response = await service.getPaging(
          1,
          value
        );
        this.items = response.data;
        this.pagination = response.meta;
    },
    clearItem() {
      this.item = new Item();
    },
    // READ - Összes adat lekérése
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

    async getPaging(page = 1, per_page = 10) {
      //   const toast = useToastStore();
      this.loading = true;

      try {
        console.log('vvvvvvvvvvvv',page, per_page);
        
        const response = await service.getPaging(page, per_page);
        this.items = response.data;
        this.pagination = response.meta;
      } catch (err) {
        this.error = err;
        console.log("getPaging Error", this.error);
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
        console.log("ccc", this.item);
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
        const response = await service.getPaging(
          this.pagination.current_page,
          this.selectedPerPage,
        );
        this.items = response.data;
        this.pagination = response.meta;
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
        const response = await service.getPaging(
          this.pagination.current_page,
          this.selectedPerPage,
        );
        this.items = response.data;
        this.pagination = response.meta;
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
        const response = await service.getPaging(this.pagination.current_page, this.selectedPerPage);
        this.items = response.data;
        this.pagination = response.meta;
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
