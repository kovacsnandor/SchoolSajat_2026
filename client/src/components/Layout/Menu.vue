<template>
  <nav class="navbar navbar-expand-md bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->
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
            <RouterLink class="nav-link" aria-current="page" to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
          <li class="nav-item dropdown"  v-if="hasMenuAccess('/adatok')">
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
              <li v-if="hasMenuAccess('/adatok/sports')">
                <RouterLink class="dropdown-item" to="/adatok/sports"
                  >Sportok</RouterLink
                >
              </li>
              <li v-if="hasMenuAccess('/adatok/schoolclasses')">
                <RouterLink class="dropdown-item" to="/adatok/schoolclasses"
                  >Osztályok</RouterLink
                >
              </li>
              <li v-if="hasMenuAccess('/adatok/students')">
                <RouterLink class="dropdown-item" to="/adatok/students"
                  >Diákok</RouterLink
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li v-if="hasMenuAccess('/adatok/playngsports')">
                <RouterLink class="dropdown-item" to="/adatok/playngsports"
                  >Sportolás</RouterLink
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li v-if="hasMenuAccess('/adatok/users')">
                <RouterLink class="dropdown-item" to="/adatok/users"
                  >Userek</RouterLink
                >
              </li>
            </ul>
          </li>
          <li class="nav-item ms-5 d-flex align-items-center">
            <!-- login -->
            <RouterLink class="nav-link" to="/login" v-if="!isLoggedIn">
              Login
            </RouterLink>
            <div v-if="isLoggedIn" class="d-flex align-items-center">
              <RouterLink class="nav-link" to="/userprofil">
                <i class="bi bi-person"></i>
                {{ userNameWithRole }}
              </RouterLink>

              <!-- logout -->
              <i
                class="bi bi-box-arrow-right ms-2 my-pointer tight-icon"
                style="font-size: 2rem"
                @click="onClickLogut()"
              ></i>
            </div>
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
import { mapActions, mapState } from "pinia";
import { useSearchStore } from "@/stores/searchStore";
import { useUserLoginLogoutStore } from "@/stores/userLoginLogoutStore";
export default {
  data() {
    return {
      name: "Menu",
      searchWordInput: "",
      timeout: null,
    };
  },
  computed: {
    ...mapState(useSearchStore, ["searchWord"]),
    ...mapState(useUserLoginLogoutStore, ["isLoggedIn", "userName", "userNameWithRole"]),
  },
  watch: {
    //Keresőszó késleltetés
    searchWordInput(newVal) {
      //töröljük az éppen futó setTimeout-ot
      //hogy újraindíthassuk
      clearTimeout(this.timeout);
      //x-re kattintva kiürül az kereső input
      if (newVal === "") {
        this.setSearchWord("");
        return;
      }
      //500ms késleltetés után tárolja
      this.timeout = setTimeout(() => {
        this.setSearchWord(newVal);
      }, 1000);
    },
    searchWord(value){
      if (!value) {
        this.searchWordInput = '';
      }
    }
  },
  methods: {
    ...mapActions(useSearchStore, ["setSearchWord"]),
    ...mapActions(useUserLoginLogoutStore, ["logout"]),
    async onClickLogut() {
      await this.logout();
      this.$router.push("/login");
    },
    hasMenuAccess(targetPath) {
      //A jogosultsági szintnek megfelelően engedélyezi, vagy tiltja a menüt
      const userStore = useUserLoginLogoutStore();
      const resolved = this.$router.resolve(targetPath);

      if (!resolved || !resolved.matched.length) return false;

      // Végigmeneteltetjük a szabályt az összes szülőn keresztül (adatok -> sports)
      // Az 'every' akkor igaz, ha minden egyes elemre igaz a feltétel
      return resolved.matched.every((route) => {
        const requiredRoles = route.meta?.roles;

        // A már meglévő Pinia getterünket hívjuk meg minden szinten
        return userStore.canAccess(requiredRoles);
      });
    },
  },
  mounted() {
    this.searchWordInput = this.searchWord;
  },
};
</script>

<style scoped>
/* 1. A sima .active ÉS a router által adott osztály is legyen sárga */
.nav-link.active,
.nav-link.router-link-exact-active {
  color: #ffff00 !important;
  font-weight: bold;
  border-bottom: 2px solid yellow;
}

/* 2. Az "Adatok" gomb sárgítása, ha az alatta lévő listában van aktív elem */
/* Azt mondjuk: "Színezd a .nav-item-et, ha van benne aktív router-link" */
.nav-item:has(.dropdown-item.router-link-active) .nav-link.dropdown-toggle {
  color: #ffff00 !important;
  font-weight: bold;
  border-bottom: 2px solid yellow;
}

/* 3. A lenyíló menüben a konkrét aktív elem (pl. Sportok) kijelölése */
.dropdown-item.router-link-active {
  /* background-color: #ffff00 !important; */
  /* color: #000 !important; */
  background-color: transparent !important; /* Levesszük a teli hátteret */
  color: #ffff00 !important; /* Csak a szöveg lesz sárga */
  font-weight: bold;
}

.tight-icon {
  line-height: 1 !important;
  display: inline-flex;
  vertical-align: middle;
}

.navbar {
  position: relative;
  z-index: 1050 !important; /* A Bootstrap modalok 1050-nél kezdődnek */
}

.dropdown-menu {
  z-index: 1060 !important;
}
</style>
