import axios from 'axios';

const baseUrl = 'https://genergy-backend.herokuapp.com';

export const workListApi = {
  getWorkList: (params: {}) =>
    axios.get(`${baseUrl}/entities/works/`, { params }), // Get work list

  createWorkItem: (params: {}) =>
    axios.post(`${baseUrl}/entities/works/`, params), // Create work item

  getWorkItem: (params: {}) =>
    axios.get(`${baseUrl}/entities/works/${params}/`), // Get work item

  updateWorkItem: (params: {}) =>
    axios.put(`${baseUrl}/entities/works/${params}/`), // Update work item

  deleteWorkItem: (params: {}) =>
    axios.delete(`${baseUrl}/entities/works/${params}/`) // Delete work item
};
