import apiClient from './axiosClient'; 
const route = '/sports';

export default {
  // GET: Összes rekord lekérése
  async getAll() {
    return await apiClient.get(`${route}`);
  },

  //paginátor: oldal/rekord_oldalanként
  async getPaging(page, per_page = 10, column='id', direction='asc', search='') {
    let url = `/sportspaging/${page}/${per_page}/${column}/${direction}`;
    if (search) {
      url = `/sportspaging/${page}/${per_page}/${column}/${direction}/${search}`;
    } 
    return await apiClient.get(url);
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