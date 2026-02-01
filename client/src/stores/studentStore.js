import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import { useSearchStore } from "./searchStore";
import service from "@/api/schoolclassService";

//változtatás
class Item {
  constructor(
    id = 0,
    diakNev = "",
    schoolclassId = 0,
    neme = 0,
    iranyitoszam = "",
    lakHelyseg = "",
    lakCim = "",
    szulHelyseg = "",
    szulDatum = "",
    igazolvanyszam = "",
    atlag = 0,
    osztondij = 0,
    eletkor = 0,
    nemeString = ""
  ) {
    this.id = id;
    this.diakNev = diakNev;
    this.schoolclassId = schoolclassId;
    this.neme = neme;
    this.iranyitoszam = iranyitoszam;
    this.lakHelyseg = lakHelyseg;
    this.lakCim = lakCim;
    this.szulHelyseg = szulHelyseg;
    this.szulDatum = szulDatum;
    this.igazolvanyszam = igazolvanyszam;
    this.atlag = atlag;
    this.osztondij = osztondij;
    this.eletkor = eletkor;
    this.nemeString = nemeString;
  }
}

export const useSturdentStore = defineStore("students", {
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
    
    async getAllByShoolclassId(schoolclassId,column='id') {
      //   const toast = useToastStore();
      this.loading = true;
      this.sortColumn = column;
      const direction =
        this.sortColumn === column && this.sortDirection === "asc"
          ? "desc"
          : "asc";
      this.sortDirection = direction;
      try {
        const response = await service.getAllByShoolclassId(
          schoolclassId,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord
        );
        this.items = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async getAllWithShoolclass(column='id') {
      //   const toast = useToastStore();
      this.loading = true;
      this.sortColumn = column;
      const direction =
        this.sortColumn === column && this.sortDirection === "asc"
          ? "desc"
          : "asc";
      this.sortDirection = direction;
      try {
        const response = await service.getAllWithShoolclass(
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord
        );
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
        this.searchStore.reset()
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
        const response = await service.getAll();
        //Töröjük a keresést
        this.searchStore.reset()
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
        const response = await service.getAllSortSearch(
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord
        );
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
        const response = await service.getAllSortSearch(
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord
        );
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
