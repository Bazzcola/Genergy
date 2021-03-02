import axios from 'axios';

const baseUrl = 'https://genergy-backend.herokuapp.com';

export const userListApi = {
  getUserList: (params: {}) => axios.get(`${baseUrl}/accounts/users/`, { params }), // User list create

  updateUserList: (params: {}) => axios.post(`${baseUrl}/accounts/users/`, { params }), // User list update

  getUserById: (params: {}) => axios.get(`${baseUrl}/accounts/users/${params}/`), // User retrieve

  updateUserById: (params: {}) => axios.put(`${baseUrl}/accounts/users/${params}/`), // User update

  deleteUserById: (params: {}) => axios.delete(`${baseUrl}/accounts/users/${params}/`), // User delete

  getUserProfile: (params: {}) => axios.get(`${baseUrl}/accounts/users/me/`, {params}), // User Profile
};
