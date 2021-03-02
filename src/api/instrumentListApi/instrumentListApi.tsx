import axios from 'axios';

const baseUrl = 'https://genergy-backend.herokuapp.com';

export const instrumentListApi = {
  getInstrumentList: (params: {}) => axios.get(`${baseUrl}/entities/utils/`, {params}), // Get Instrument list

  createInstrumentItem: (params: {}) => axios.post(`${baseUrl}/entities/utils/`, params), // Create Instrument item

  getInstrumentItem: (params: {}) => axios.get(`${baseUrl}/entities/utils/${params}/`), // Get Instrument item

  updateInstrumentItem: (params: {}) => axios.put(`${baseUrl}/entities/utils/${params}/`), // Update Instrument item

  deleteInstrumentItem: (params: {}) => axios.delete(`${baseUrl}/entities/utils/${params}/`) // Delete Instrument item
};