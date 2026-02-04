import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toastStore";
import { useSearchStore } from "./searchStore";
import service from "@/api/studentService";

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
    nemeString = "",
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

export const useStudentStore = defineStore("students", {
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
    clearItem(schoolclassId = 0) {
      this.item = new Item();
      this.item.schoolclassId = schoolclassId;
    },

    async getAllByShoolclassId(schoolclassId, column = "id", direction = "") {
      //   const toast = useToastStore();
      this.loading = true;
      this.error = null;
      this.sortColumn = column;
      if (!direction) {
        direction =
          this.sortColumn === column && this.sortDirection === "asc"
            ? "desc"
            : "asc";
      }
      this.sortDirection = direction;
      try {
        console.log("oszlop", column);

        const response = await service.getAllByShoolclassId(
          schoolclassId,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
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

    async getAllWithShoolclass(column = "id") {
      //   const toast = useToastStore();
      this.loading = true;
      this.error = null;
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
          this.searchStore.searchWord,
        );
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

    async getAll() {
      //   const toast = useToastStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await service.getAll();
        this.searchStore.reset();
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

    // READ - Egy adat lekérése
    async getById(id) {
      this.loading = true;
      //   const toast = useToastStore();
      this.error = null;
      try {
        const response = await service.getById(id);
        this.item = response.data;
        return true;
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
    async create(data, schoolclassId) {
      this.loading = true;
      this.error = null;
      try {
        const newItem = await service.create(data);
        const response = await service.getAllByShoolclassId(
          schoolclassId,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        //Töröjük a keresést
        this.searchStore.reset();
        this.items = response.data;
        // const toast = useToastStore();
        // toast.messages.push("User sikeresen létrehozva!");
        // toast.show("Success");
        return true;
      } catch (err) {
        console.log("új elem Error", err);
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
    async update(id, updateData, schoolclassId) {
      this.loading = true;
      this.error = null;
      try {
        const updatedItem = await service.update(id, updateData);
        const response = await service.getAllByShoolclassId(
          schoolclassId,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
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
    async delete(id, schoolclassId) {
      this.loading = true;
      this.error = null;
      try {
        await service.delete(id);
        const response = await service.getAllByShoolclassId(
          schoolclassId,
          this.sortColumn,
          this.sortDirection,
          this.searchStore.searchWord,
        );
        this.items = response.data;
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
