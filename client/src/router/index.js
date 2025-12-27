import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        title: (route) => 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
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
