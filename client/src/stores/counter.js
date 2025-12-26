import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  //Ezek a változók
  state: () => ({
    counter: 0,
    desiredLength: 3,
  }),
  //valamilyen formában visszaadja
  getters: {
    paddedCount: (state) => {
      return state.counter.toString().padStart(state.desiredLength, "0");
    },
  },
  //csinál vele valamit
  actions: {
    addCount(number) {
      this.counter += number;
    },
    doubleCount() {
      this.counter = this.counter * 2;
    },
    increment() {
      this.counter++;
    },
  },
});
