import apiClient from './axiosClient'; 
const route = '/schoolclasses';

export default {
  async getAllAbc(id) {
    const url = `/schoolclassesabc`
    return await apiClient.get(url);
  },

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
    delete data.id; //id kulcsot kiveszi az objektumból
    return await apiClient.post(`${route}`, data);
  },

  // PUT: Módosítás
  async update(id, data) {
    delete data.id; //id kulcsot kiveszi az objektumból
    return await apiClient.patch(`${route}/${id}`, data);
  },

  // DELETE: Törlés
  async delete(id) {
    return await apiClient.delete(`${route}/${id}`);
  }
};