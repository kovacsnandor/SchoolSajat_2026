
<template>
  <div class="container-fluid my-container my-border mt-5">
    <!-- Head -->
    <h1>Iskola</h1>

    <!-- Menü -->
    <Menu/>

    <!-- Ide töltődnek be az oldalak -->
    <RouterView />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
  components: {
    Menu
  }
}
</script>


<style>

</style>
