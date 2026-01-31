
<template>
  <div class="container-fluid my-container my-border my-1">
    <!-- Head -->
    <h1>Iskola</h1>

    <!-- Menü -->
    <Menu class="my-border"/>

    <!-- Breadcrumb -->
    <Breadcrumb class="my-border"/>
    
    <!-- Ide töltődnek be az oldalak -->
    <RouterView class="my-border my-content-height overflow-y-auto"/>
    <!-- lábléc -->

    <Footer class="my-border"/>
  </div>
</template>

<script>
import Menu from '@/components/Layout/Menu.vue';
import Breadcrumb from './components/Layout/Breadcrumb.vue';
import Footer from './components/Layout/Footer.vue';

export default {
  components: {
    Menu,
    Breadcrumb,
    Footer
  }
}
</script>


<style>

</style>
