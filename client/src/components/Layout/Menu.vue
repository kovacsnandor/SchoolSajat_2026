<template>
  <nav class="navbar navbar-expand-md bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Adatok
            </a>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" to="/sports">Sportok</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/schoolclasses">Osztályok</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/students">Diákok</RouterLink></li>
              <li><hr class="dropdown-divider" /></li>
              <li><RouterLink class="dropdown-item" to="/playngsports">Sportolás</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <div class="d-flex align-items-center" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchWordInput"
            id="search"
          />
          <label for="search" class="form-label m-0">
            <i class="bi bi-search fs-4 my-pointer"></i>
          </label>
          <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useSearchStore } from '@/stores/searchStore';  
export default {
  data(){
    return {
      name: "Menu",
      searchWordInput: '',
      timeout: null,
    }
  },
  computed: {
    ...mapState(useSearchStore,['searchWord'])
  },
  watch: {
    searchWordInput(newVal){
      //töröljük az éppen futó setTimeout-ot
      //hogy újraindíthassuk
      clearTimeout(this.timeout);
      //x-re kattintva kiürül az kereső input
      if (newVal === '') {
        this.setSearchWord('');
        return;
      }
      //500ms késleltetés után tárolja
      this.timeout = setTimeout(() => {
        this.setSearchWord(newVal);
      }, 500);
    }
  },
  methods: {
    ...mapActions(useSearchStore, ['setSearchWord'])
  },
  mounted(){
    this.searchWordInput = this.searchWord;
  }
};
</script>

<style>
</style>