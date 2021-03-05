import axios from 'axios';

const baseUrl = 'https://genergy-backend.herokuapp.com';

export const materialListApi = {
  getMaterialList: (params: {}) =>
    axios.get(`${baseUrl}/entities/items/`, { params }), // Get material list

  createMaterialItem: (params: {}) =>
    axios.post(`${baseUrl}/entities/items/`, params), // Create material item

  getMaterialItem: (params: {}) =>
    axios.get(`${baseUrl}/entities/items/${params}/`), // Get material item

  updateMaterialItem: (params: {}) =>
    axios.put(`${baseUrl}/entities/items/${params}/`), // Update material item

  deleteMaterialItem: (params: {}) =>
    axios.delete(`${baseUrl}/entities/items/${params}/`) // Delete material item
};
