import { Canceler } from 'axios';
import { axios, cancelToken } from 'axios/axios';

export const userListApi = {
  getUserList: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/accounts/users/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.getUserList.cancel = c) // User list create
        )
      }),
    cancel: (() => null) as Canceler
  },

  updateUserList: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.post(`/accounts/users/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.updateUserList.cancel = c) // User list update
        )
      }),
    cancel: (() => null) as Canceler
  },

  getUserById: {
    action: (params = {}): Promise<{ data: any }> =>
      axios.get(`/accounts/users/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.getUserById.cancel = c) // User retrieve
        )
      }),
    cancel: (() => null) as Canceler
  },

  updateUserById: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.put(`/accounts/users/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.updateUserById.cancel = c) // User retrieve
        )
      }),
    cancel: (() => null) as Canceler
  },

  deleteUserById: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.delete(`/accounts/users/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.deleteUserById.cancel = c) // User retrieve
        )
      }),
    cancel: (() => null) as Canceler
  },

  getUserProfile: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/accounts/users/me/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.getUserProfile.cancel = c) // User retrieve
        )
      }),
    cancel: (() => null) as Canceler
  }

  // getUserList: (params: {}) =>
  //  axios.get(`${baseUrl}/accounts/users/`, { params }), // User list create

  // updateUserList: (params: {}) =>
  //   axios.post(`${baseUrl}/accounts/users/`, { params }), // User list update

  // getUserById: (params: {}) =>
  //   axios.get(`${baseUrl}/accounts/users/${params}/`), // User retrieve

  // updateUserById: (params: {}) =>
  //   axios.put(`${baseUrl}/accounts/users/${params}/`), // User update

  // deleteUserById: (params: {}) =>
  //   axios.delete(`${baseUrl}/accounts/users/${params}/`), // User delete

  // getUserProfile: (params: {}) =>
  //   axios.get(`${baseUrl}/accounts/users/me/`, { params }) // User Profile
};
