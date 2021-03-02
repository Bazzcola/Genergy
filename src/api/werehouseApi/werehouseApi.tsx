import axios from 'axios';

const baseUrl = 'https://genergy-backend.herokuapp.com';

export const werehouseApi = {
  addMaterials: (params: {}) => axios.post(`${baseUrl}/entities/items/${params}/supply/`), // Add materials 

  addMaterialsToUser: (params: {}) => axios.post(`${baseUrl}/entities/items/${params}/afford/`), // Add materials to user

  addInstruments: (params: {}) => axios.post(`${baseUrl}/entities/utils/${params}/supply/`), // Add instruments

  addInstrumentsToUser: (params: {}) => axios.post(`${baseUrl}/entities/utils/${params}/afford/`), // Add instruments
};