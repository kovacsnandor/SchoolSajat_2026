import { defineStore } from 'pinia';
import { useToastStore } from '@/stores/toastStore';

// Ezt a függvényt fogjuk exportálni, amit minden táblánál egyedi névvel hívsz meg
export const createTableStore = (storeId, service) => {
  return defineStore(storeId, {
    state: () => ({
      items: [],
      loading: false,
      error: null
    }),

    actions: {
      // 1. READ - Összes adat lekérése
      async getAll() {
        this.loading = true;
        try {
          this.items = await service.getAll();
        } catch (err) {
          this.error = err;
        } finally {
          this.loading = false;
        }
      },

      // 2. CREATE - Új elem hozzáadása
      async create(data) {
        try {
          const newItem = await service.create(data);
          this.items.push(newItem);
          
          const toast = useToastStore();
          toast.show("Sikeresen létrehozva!", "success");
          return true;
        } catch (err) {
          return false;
        }
      },

      // 3. UPDATE - Módosítás (Helyi frissítéssel, újraolvasás nélkül)
      async update(id, updateData) {
        try {
          const updatedItem = await service.update(id, updateData);
          
          // Megkeressük az elem helyét a listában
          const index = this.items.findIndex(item => item.id === id);
          
          if (index !== -1) {
            // A splice-szal garantáljuk, hogy a Vue azonnal észrevegye a változást
            this.items.splice(index, 1, updatedItem);
          }
          
          const toast = useToastStore();
          toast.show("Sikeresen frissítve!", "success");
          return true;
        } catch (err) {
          return false;
        }
      },

      // 4. DELETE - Törlés
      async delete(id) {
        try {
          await service.delete(id);
          this.items = this.items.filter(item => item.id !== id);
          
          const toast = useToastStore();
          toast.show("Törlés sikeres!", "success");
          return true;
        } catch (err) {
          return false;
        }
      }
    }
  });
};