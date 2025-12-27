import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
    state: () => ({
        messages: [] // Itt tároljuk az aktív üzeneteket
    }),
    actions: {
        show(text, type = 'success') {
            const id = Date.now();
            this.messages.push({ id, text, type });

            // 3 másodperc után automatikusan töröljük
            setTimeout(() => {
                this.messages = this.messages.filter(m => m.id !== id);
            }, 3000);
        }
    }
});