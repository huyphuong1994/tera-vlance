import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const MenuEndpoint = `${endpoint}/menu`;

const MenuApi = {
  getList: async ({ params }) => await api.get(`${MenuEndpoint}/list`, params),
  getDetail: async ({ id }) => await api.get(`${MenuEndpoint}/detail/${id}`),
  create: async ({ params }) => await api.post(`${MenuEndpoint}`, params),
  update: async ({ id, params }) =>
    await api.put(`${MenuEndpoint}/update/${id}`, params),
  updateNode: async ({ params }) =>
    await api.put(`${MenuEndpoint}/update-node`, params),
  delete: async ({ id }) => await api.delete(`${MenuEndpoint}/${id}`),
};

export default MenuApi;
