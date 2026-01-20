import apiClient from "./axiosClient";
const route = "/users";

export default {
  //--- login, logout
  //Login user
  login(data) {
    return apiClient.post(`${route}/login`, data);
  },
  //Logout user
  logout() {
    return apiClient.post(`${route}/logout`, null);
  },
  getMeRefresh() {
    return apiClient.get(`/usersme`);
  },
};
