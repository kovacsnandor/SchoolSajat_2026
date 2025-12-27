import apiClient from './axiosClient'; // Az előző válaszban megírt példány
const route = '/sports';

export default {
  // GET: Összes termék lekérése
  getAll() {
    return apiClient.get(`${route}`);
  },

  // GET: Egy konkrét termék (ID alapján)
  getById(id) {
    return apiClient.get(`${route}/${id}`);
  },

  // POST: Új termék mentése (itt adjuk át a 'product' objektumot)
  create(data) {
    // Az Axios automatikusan JSON-ná alakítja és beteszi a Body-ba
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