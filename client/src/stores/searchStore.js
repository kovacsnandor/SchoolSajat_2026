import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  //Ezek a változók
  state: () => ({
    searchWord: null,
  }),
  //valamilyen formában visszaadja
  getters: {
    searchword() {
      return this.searchWord.toLowerCase();
    },
  },
  //csinál vele valamit
  actions: {
    reset(){
        this.searchWord = null;
    },
    setSearchWord(value){
        this.searchWord = value;
    }
  },
});
