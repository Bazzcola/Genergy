import { Canceler } from 'axios';
import { axios, cancelToken } from 'axios/axios';

export const instrumentListApi = {
  getInstrumentList: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/entities/utils/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (instrumentListApi.getInstrumentList.cancel = c) // Get Instrument list
        )
      }),
    cancel: (() => null) as Canceler
  },
  createInstrumentItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.post(`/entities/utils/`, params, {
        cancelToken: new cancelToken(
          (c: Canceler) => (instrumentListApi.createInstrumentItem.cancel = c) // Create Instrument item
        )
      }),
    cancel: (() => null) as Canceler
  },
  getInstrumentItem: {
    action: (params: {}): Promise<{ data: any }> =>
      axios.get(`/entities/utils/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (instrumentListApi.getInstrumentItem.cancel = c) // Get Instrument item
        )
      }),
    cancel: (() => null) as Canceler
  },
  updateInstrumentItem: {
    action: (params: any): Promise<{ data: any }> =>
      axios.put(`/entities/utils/${params.id}/`, params, {
        cancelToken: new cancelToken(
          (c: Canceler) => (instrumentListApi.updateInstrumentItem.cancel = c) // Update Instrument item
        )
      }),
    cancel: (() => null) as Canceler
  },
  deleteInstrumentItem: {
    action: (params: any): Promise<{ data: any }> =>
      axios.delete(`/entities/utils/${params}/`, {
        cancelToken: new cancelToken(
          (c: Canceler) => (instrumentListApi.deleteInstrumentItem.cancel = c) // Delete Instrument item
        )
      }),
    cancel: (() => null) as Canceler
  }
};
