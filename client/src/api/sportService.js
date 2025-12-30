import apiClient from './axiosClient'; 
const route = '/sports';

export default {
  // GET: Összes termék lekérése
  getAll() {
    return apiClient.get(`${route}`);
  },

  // GET: Egy termék (ID alapján)
  getById(id) {
    return apiClient.get(`${route}/${id}`);
  },

  // POST: Új termék posztolás
  create(data) {
    // Az Axios automatikusan JSON-ná alakítja
    // és beteszi a Body-ba
    return apiClient.post(`${route}`, data);
  },

  // PUT: Módosítás
  update(id, data) {
    return apiClient.put(`${route}/${id}`, data);
  },

  // DELETE: Törlés
  delete(id) {
    return apiClient.delete(`${route}/${id}`);
  }
};