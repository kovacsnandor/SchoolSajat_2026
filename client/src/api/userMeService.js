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
    return apiClient.patch(`${route}`, data);
  },
  updatePassword(data) {
    return apiClient.patch(`${'/usersmeupdatepassword'}`, data);
  },
  deleteMe() {
    return apiClient.delete(`${route}`);
  },
};
