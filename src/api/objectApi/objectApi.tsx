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
  },
  getObject: {
    action: (params: any): Promise<{ data: any }> =>
      axios.get(`/projects/projects/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (objectApi.getObject.cancel = c) // Get object by id
        )
      }),
    cancel: (() => null) as Canceler
  },
  addWorkerTimeOnObject: {
    action: (params: any, objectId: any, userId: any): Promise<{ data: any }> =>
      axios.patch(
        `/projects/projects/${objectId}/executors/${userId}/`,
        params,
        {
          cancelToken: new cancelToken(
            (c: Canceler) => (objectApi.addWorkerTimeOnObject.cancel = c) // Add time to worker on object
          )
        }
      ),
    cancel: (() => null) as Canceler
  },
  updateObject: {
    action: (params: any, projectId: any): Promise<{ data: any }> =>
      axios.patch(`/projects/projects/${projectId}/`, params, {
        cancelToken: new cancelToken(
          (c: Canceler) => (objectApi.updateObject.cancel = c) // Get object list
        )
      }),
    cancel: (() => null) as Canceler
  },
  getOwnObject: {
    action: (id: any, params: any): Promise<{ data: any }> =>
      axios.get(
        `/accounts/users/${id}/own_projects/${
          params ? `?search=${params}` : ``
        }`,
        {
          cancelToken: new cancelToken(
            (c: Canceler) => (objectApi.getOwnObject.cancel = c) // Get object list
          )
        }
      ),
    cancel: (() => null) as Canceler
  }
};
