import axios from "axios";
import { useUserLoginLogoutStore } from "@/stores/userLoginLogoutStore";
import { useToastStore } from "@/stores/toastStore";

// apiClient objektum:
// tartalmazza az összes crud függvényt
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR (elfogó):
// Lefut minden egyes kérés előtt
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('user_token'); // Vagy a Pinia store-ból
    const token = useUserLoginLogoutStore().token; // Vagy a Pinia store-ból
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR:
// Lefut minden válasz érkezésekor
apiClient.interceptors.response.use(
  (response) => response.data, // Csak az adatot adjuk vissza, nem a teljes objektumot
  (error) => {
    
    const toastStore = useToastStore();
    // Ha a szerver válaszolt
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || "Hiba történt";

      // 1. Speciális eset: 422 Unprocessable Entity (Validációs hiba)
      if (status === 422) {
        // Itt NE dobjunk toast-ot, mert a Bootstrap mezők alá akarjuk tenni a hibát.
        // Csak adjuk tovább a hibát a komponensnek.
        return Promise.reject(error);
      }

      // 2. Speciális eset: 401 Unauthorized
      if (status === 401) {
        // Ha login-nál kapunk 401-et, azt kiírhatjuk toast-ban (pl. Rossz jelszó)
        toastStore.messages.push(message);
        toastStore.show("Error");
        return Promise.reject(error);
      }

      // 3. Minden egyéb hiba (500, 404, 403, stb.)
      toastStore.messages.push(message);
      toastStore.show("Error");

    } else {
      // Hálózati hiba (nincs válasz)
      toastStore.messages.push("A szerver nem elérhető.");
      toastStore.show("Error");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
