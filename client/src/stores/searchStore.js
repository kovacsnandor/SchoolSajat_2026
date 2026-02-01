import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  //Ezek a változók
  state: () => ({
    searchWord: '',
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
        this.searchWord = '';
    },
    setSearchWord(value){
        this.searchWord = value.trim();
    }
  },
});
