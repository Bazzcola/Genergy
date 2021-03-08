import { Canceler } from 'axios';
import { axios, cancelToken } from 'axios/axios';

export const workListApi = {
  getWorkList: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/entities/works/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (workListApi.getWorkList.cancel = c) // Get work list
        )
      }),
    cancel: (() => null) as Canceler
  },
  createWorkItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.post(`/entities/works/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (workListApi.createWorkItem.cancel = c) // Create work item
        )
      }),
    cancel: (() => null) as Canceler
  },
  getWorkItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/entities/works/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (workListApi.getWorkItem.cancel = c) // Get work item
        )
      }),
    cancel: (() => null) as Canceler
  },
  updateWorkItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.put(`/entities/works/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (workListApi.updateWorkItem.cancel = c) // Update work item
        )
      }),
    cancel: (() => null) as Canceler
  },
  deleteWorkItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.delete(`/entities/works/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (workListApi.deleteWorkItem.cancel = c) // Delete work item
        )
      }),
    cancel: (() => null) as Canceler
  },

  // getWorkList: (params: {}) =>
  //   axios.get(`${baseUrl}/entities/works/`, { params }), // Get work list

  // createWorkItem: (params: {}) =>
  //   axios.post(`${baseUrl}/entities/works/`, params), // Create work item

  // getWorkItem: (params: {}) =>
  //   axios.get(`${baseUrl}/entities/works/${params}/`), // Get work item

  // updateWorkItem: (params: {}) =>
  //   axios.put(`${baseUrl}/entities/works/${params}/`), // Update work item

  // deleteWorkItem: (params: {}) =>
  //   axios.delete(`${baseUrl}/entities/works/${params}/`) // Delete work item
};
