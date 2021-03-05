import axios from 'axios';

const baseUrl = 'https://genergy-backend.herokuapp.com';

export const authApi = {
  authLogin: (params: {}) =>
    axios.post(`${baseUrl}/accounts/auth/login`, params), // JWT authorization login

  authVerify: (params: {}) =>
    axios.post(`${baseUrl}/accounts/auth/verify`, params), // JWT authorization verify

  authRefresh: (params: {}) =>
    axios.post(`${baseUrl}/accounts/auth/refresh`, params) // JWT authorization refresh
};
