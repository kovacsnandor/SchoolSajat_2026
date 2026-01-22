import apiClient from './axiosClient'; 
const route = '/sports';

export default {
  // GET: Összes rekord lekérése
  async getAll() {
    return await apiClient.get(`${route}`);
  },

  // GET: Egy rekord (ID alapján)
  async getById(id) {
    const url = `${route}/${id}`
    return await apiClient.get(url);
  },

  // POST: Új rekord posztolás
  async create(data) {
    // Az Axios automatikusan JSON-ná alakítja
    // és beteszi a Body-ba
    delete data.id;
    return await apiClient.post(`${route}`, data);
  },

  // PUT: Módosítás
  async update(id, data) {
    delete data.id;
    console.log("data", data);
    return await apiClient.patch(`${route}/${id}`, data);
  },

  // DELETE: Törlés
  async delete(id) {
    return await apiClient.delete(`${route}/${id}`);
  }
};