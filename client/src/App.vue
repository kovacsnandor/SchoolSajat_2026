
<template>
  <div class="container-fluid my-container my-border mt-5">
    <!-- Head -->
    <h1>Iskola</h1>

    <!-- Menü -->
    <Menu/>

    <!-- Breadcrumb -->
    <Breadcrumb/>
    
    <!-- Ide töltődnek be az oldalak -->
    <RouterView />
  </div>
</template>

<script>
import Menu from '@/components/Layout/Menu.vue';
import Breadcrumb from './components/Layout/Breadcrumb.vue';

export default {
  components: {
    Menu,
    Breadcrumb
  }
}
</script>


<style>

</style>
