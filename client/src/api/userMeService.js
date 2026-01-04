import apiClient from "./axiosClient";
const route = "/usersme";

export default {
  //--- UserMe CRUD
  //Önmagát lekérdezheti
  getMe() {
    return apiClient.get(`${route}`);
  },
  //önmagát módosíthatja (jelszó, email, name)
  updateMe(data) {
    return apiClient.put(`${route}`, data);
  },
  deleteMe() {
    return apiClient.delete(`${route}`);
  },
};
