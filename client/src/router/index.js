import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useUserLoginLogoutStore } from "@/stores/userLoginLogoutStore";
import EmptyWrapper from "@/components/Layout/EmptyWrapper.vue";

function checkIfNotLogged() {
  const storeAuth = useUserLoginLogoutStore();
  if (!storeAuth.isLoggedIn) {
    return "/login";
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      // beforeEnter: [checkIfNotLogged],
      meta: {
        title: (route) => "Home",
        breadcrumb: "Home",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
      // beforeEnter: [checkIfNotLogged],
      meta: {
        title: (route) => "About",
        breadcrumb: "About",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        title: (route) => "Login",
        breadcrumb: "Login",
      },
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("@/views/RegistrationView.vue"),
      meta: {
        title: (route) => "Regisztráció",
        breadcrumb: "Regisztráció",
      },
    },
    {
      path: "/userprofil",
      name: "userprofil",
      component: () => import("@/views/UserProfilView.vue"),
      beforeEnter: [checkIfNotLogged],
      meta: {
        title: (route) => "User profil",
        breadcrumb: "User profil",
      },
    },
    {
      path: "/adatok",
      // Ez csak egy üres keret a gyerekeknek
      component: EmptyWrapper,
      meta: {
        breadcrumb: "Adatok",
        disabled: true, // Egyedi jelző, hogy ne legyen kattintható breadcrumb-ban
        roles: [1, 2],
      },
      children: [
        {
          path: "sports",
          name: "sports",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("@/views/SportsView.vue"),
          beforeEnter: [checkIfNotLogged],
          meta: {
            title: (route) => "Sportok",
            breadcrumb: "Sportok",
            roles: [1],
          },
        },
        {
          path: "schoolclasses",
          name: "schoolclasses",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("@/views/SchoolclassesView.vue"),
          beforeEnter: [checkIfNotLogged],
          meta: {
            title: (route) => "Osztályok",
            breadcrumb: "Osztályok",
            roles: [1],
          },
        },
        {
          path: "students",
          name: "students",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("@/views/StudentsView.vue"),
          beforeEnter: [checkIfNotLogged],
          meta: {
            title: (route) => "Tanulók",
            breadcrumb: "Tanulók",
            roles: [1, 2],
          },
        },
        {
          path: "playngsports",
          name: "playngsports",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("@/views/PlayngsportsView.vue"),
          beforeEnter: [checkIfNotLogged],
          meta: {
            title: (route) => "Sportolások",
            breadcrumb: "Sportolások",
            roles: [1, 2],
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/404.vue"),
      meta: {
        title: (route) => "404",
        breadcrumb: "404",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = "Iskola - " + to.meta.title(to);
  //mehetsz tovább az oldalra

  // Megkeressük az összes meta.roles beállítást az útvonal láncban
  // (A to.matched azért jó, mert ha a szülő védett, az egész ág védett lesz)
  const requiredRoles = to.meta.roles;
  const userStore = useUserLoginLogoutStore();
  // Használjuk a már megismert logikát
  if (userStore.canAccess(requiredRoles)) {
    // 1. eset: Van joga (vagy publikus), mehet tovább
    next();
  } else {
    // 2. eset: Nincs joga
    if (!userStore.isLoggedIn) {
      // Ha nincs belépve, küldjük a loginra
      next({ path: "/login" });
    } else {
      // Ha be van lépve, de ehhez nincs joga (pl. diák admin oldalra téved)
      // Küldjük a főoldalra vagy egy "Nincs jogosultság" oldalra
      alert("Nincs jogosultságod az oldal megtekintéséhez!");
      next("/");
    }
  }

  // next();
});

export default router;
