import { Canceler } from 'axios';
import { axios, cancelToken } from 'axios/axios';

export const userListApi = {
  getUserList: {
    action: (params: any): Promise<{ data: any }> =>
      axios.get(`/accounts/users/${params ? `?search=${params}` : ``}`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.getUserList.cancel = c) // User list create
        )
      }),
    cancel: (() => null) as Canceler
  },

  updateUserList: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.post(`/accounts/users/`, params, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.updateUserList.cancel = c) // User list update (create)
        )
      }),
    cancel: (() => null) as Canceler
  },

  getUserById: {
    action: (params = {}): Promise<{ data: any }> =>
      axios.get(`/accounts/users/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.getUserById.cancel = c) // User retrieve by id
        )
      }),
    cancel: (() => null) as Canceler
  },

  updateUserById: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.put(`/accounts/users/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.updateUserById.cancel = c) // User update by id
        )
      }),
    cancel: (() => null) as Canceler
  },

  deleteUserById: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.delete(`/accounts/users/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.deleteUserById.cancel = c) // User delete
        )
      }),
    cancel: (() => null) as Canceler
  },

  getUserProfile: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/accounts/users/me/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (userListApi.getUserProfile.cancel = c) // User profile
        )
      }),
    cancel: (() => null) as Canceler
  }
};
