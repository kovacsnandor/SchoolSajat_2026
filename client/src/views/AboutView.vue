<template>
  <div>

    <div class="about">
      <h1>Rólunk</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ratione aspernatur dolor quisquam veniam, tenetur sed iure eum autem saepe corporis non quos nostrum fugit, porro earum laboriosam? Illo, aliquid?</p>
      <div v-if="debug">
        <hr>
        <ul>
          <li>import.meta.env.DEV: {{ dev }}</li>
          <li>import.meta.env.PROD: {{ prod }}</li>
        <li>import.meta.env.SSR: {{ ssr }}</li>
        <li>import.meta.env.MODE: {{ mode }}</li>
      </ul>
      <hr>
      <ul>
        <li>{{ title }}</li>
        <li>Version: {{ ver }}</li>
        <li>API url: {{ apiUrl }}</li>
        
      </ul>
    </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      debug: import.meta.env.VITE_DEBUG_MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
      ssr: import.meta.env.SSR,
      mode: import.meta.env.MODE,
      title: import.meta.env.VITE_APP_TITLE,
      ver: import.meta.env.VITE_APP_VER,
      apiUrl: import.meta.env.VITE_API_URL
    }
  }
}
</script>

<style>

</style>
