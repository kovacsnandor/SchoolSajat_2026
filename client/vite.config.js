import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite"; // loadEnv importálása
import vue from "@vitejs/plugin-vue";

// A konfigurációt már nem objektumként, hanem függvényként exportáljuk.
export default defineConfig(({ mode }) => {
  // 1. Környezeti Változók Betöltése
  // A Vite API-t használjuk a mode és az aktuális mappa alapján.
  // Csak a 'VITE_' kezdetű változókat töltjük be.
  const env = loadEnv(mode, process.cwd(), "VITE_");

  // 2. Visszatérés a konfigurációs objektummal
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    //A fordítási mappa megadása
    build: {
      outDir: env.VITE_BUILD_DIR,
      //Előtte takarítsa-e a mappát
      emptyOutDir: false,
    },

    //Az alkalmazás mappaneve attól függően, hogy milyen módban vagyunk
    base: mode === "development" ? "/" : env.VITE_WEB_DIR,
  };
});