import { Canceler } from 'axios';
import { axios, cancelToken } from 'axios/axios';

export const werehouseApi = {
  addMaterials: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.post(`/entities/items/${params}/supply/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (werehouseApi.addMaterials.cancel = c) // Add materials
        )
      }),
    cancel: (() => null) as Canceler
  },
  addMaterialsToUser: {
    action: (params: any): Promise<{ data: any }> =>
      axios.post(`/entities/items/${params.id}/afford/`, params.materials, {
        cancelToken: new cancelToken(
          (c: Canceler) => (werehouseApi.addMaterialsToUser.cancel = c) //  Add materials to user
        )
      }),
    cancel: (() => null) as Canceler
  },
  addInstruments: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.post(`/entities/utils/${params}/supply/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (werehouseApi.addInstruments.cancel = c) //  Add instruments
        )
      }),
    cancel: (() => null) as Canceler
  },
  addInstrumentsToUser: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.post(`/entities/utils/${params}/afford/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (werehouseApi.addInstrumentsToUser.cancel = c) //  Add instruments to user
        )
      }),
    cancel: (() => null) as Canceler
  }
};
