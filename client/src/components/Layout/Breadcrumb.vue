<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb m-0">
      <li class="breadcrumb-item">
        <router-link to="/">Kezdőlap</router-link>
      </li>

      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbs.length - 1 }"
      >
        <router-link 
          v-if="index < breadcrumbs.length - 1 && !crumb.disabled" 
          :to="crumb.path"
        >
          {{ crumb.label }}
        </router-link>
        
        <span v-else :class="{ 'text-muted': crumb.disabled }">
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      let matchedRoutes = this.$route.matched
        .filter(route => route.meta && route.meta.breadcrumb);

      // Eltávolítjuk a kezdőlapot, ha benne van (mert manuálisan kitettük)
      if (matchedRoutes.length > 0 && (matchedRoutes[0].path === '/' || matchedRoutes[0].path === '')) {
        matchedRoutes.shift();
      }

      return matchedRoutes.map(route => ({
        label: route.meta.breadcrumb,
        path: route.path,
        disabled: route.meta.disabled // Itt adjuk át a tiltás jelzőt
      }));
    }
  }
}
</script>

<style scoped>
/* A Bootstrap alapból ad stílust, de itt finomhangolhatod, ha kell */
.breadcrumb {
  background-color: transparent; /* Ha régebbi Bootstrapet használsz, ez jól jöhet */
  padding: 0.75rem 0;
}
</style>