import { Canceler } from 'axios';
import { axios, cancelToken } from 'axios/axios';

export const objectApi = {
  getObjectList: {
    action: (params: any): Promise<{ data: any }> =>
      axios.get(`/projects/projects/${params ? `?search=${params}` : ``}`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (objectApi.getObjectList.cancel = c) // Get object list
        )
      }),
    cancel: (() => null) as Canceler
  },
  createObject: {
    action: (params: any): Promise<{ data: any }> =>
      axios.post(`/projects/projects/`, params, {
        cancelToken: new cancelToken(
          (c: Canceler) => (objectApi.createObject.cancel = c) // Create object
        )
      }),
    cancel: (() => null) as Canceler
  }
};
