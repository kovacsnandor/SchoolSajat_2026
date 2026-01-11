import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
    state: () => ({
        messages: [], // Itt tároljuk az aktív üzeneteket
        type: null
    }),
    actions: {
        show( type = 'Success') {
            // 3 másodperc után automatikusan töröljük
            this.type = type;
            setTimeout(() => {
                // this.messages = this.messages.filter(m => m.id !== id);
                this.messages = [];
                this.type = null;
            }, 3000);
        },
        close(){
            this.messages = [];
        }
    }
});