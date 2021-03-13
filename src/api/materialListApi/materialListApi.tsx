import { Canceler } from 'axios';
import { axios, cancelToken } from 'axios/axios';

export const materialListApi = {
  getMaterialList: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/entities/items/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (materialListApi.getMaterialList.cancel = c) // Get material list
        )
      }),
    cancel: (() => null) as Canceler
  },
  createMaterialItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.post(`/entities/items/`, params, {
        cancelToken: new cancelToken(
          (c: Canceler) => (materialListApi.createMaterialItem.cancel = c) // Create material item
        )
      }),
    cancel: (() => null) as Canceler
  },
  getMaterialItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/entities/items/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (materialListApi.getMaterialItem.cancel = c) // Get material item
        )
      }),
    cancel: (() => null) as Canceler
  },
  updateMaterialItem: {
    action: (params: any): Promise<{ data: any }> =>
      axios.put(`/entities/items/${params.id}/`, params, {
        cancelToken: new cancelToken(
          (c: Canceler) => (materialListApi.updateMaterialItem.cancel = c) // Update material item
        )
      }),
    cancel: (() => null) as Canceler
  },
  deleteMaterialItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.delete(`/entities/items/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (materialListApi.deleteMaterialItem.cancel = c) //  Delete material item
        )
      }),
    cancel: (() => null) as Canceler
  }
};
