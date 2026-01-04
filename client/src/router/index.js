import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useUserLoginLogoutStore } from '@/stores/userLoginLogoutStore';

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
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: [checkIfNotLogged],
      meta:{
        title: (route) => 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      beforeEnter: [checkIfNotLogged],
      meta:{
        title: (route) => 'About'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta:{
        title: (route) => 'About'
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/RegistrationView.vue'),
      meta:{
        title: (route) => 'About'
      }
    },
    {
      path: '/sports',
      name: 'sports',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/SportsView.vue'),
      beforeEnter: [checkIfNotLogged],
      meta:{
        title: (route) => 'Sportok'
      }
    },
    { path: "/:pathMatch(.*)*", 
      name: "NotFound", 
      component: () => import('@/views/404.vue'),
      meta:{
        title: (route) => '404'
      }
    },
  ],
})

router.beforeEach((to,from, next) => {
  document.title = 'Iskola - ' + to.meta.title(to);
  //mehetsz tovább az oldalra
  next();
});

export default router
