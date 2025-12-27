import axios from 'axios';

//Ez egy objektum, ami tartalmazza az összes crud függvényt
const apiClient = axios.create({
  baseURL: 'https://api.pelda.hu/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// REQUEST INTERCEPTOR (elfogó): Lefut minden egyes kérés előtt
apiClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem('user_token'); // Vagy a Pinia store-ból
  const token = ""; // Vagy a Pinia store-ból
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// RESPONSE INTERCEPTOR: Lefut minden válasz érkezésekor
apiClient.interceptors.response.use(
  (response) => response.data, // Csak az adatot adjuk vissza, nem a teljes objektumot
  (error) => {
    // Itt központilag kezelheted a 401 (lejárt token) hibát
    if (error.response?.status === 401) {
      console.error("Lejárt munkamenet, kijelentkezés...");
      // router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default apiClient;