import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const LocationEndpoint = `${endpoint}/crm/locations`;

const LocationApi = {
  getList: async ({ params }) =>
    await api.get(`${LocationEndpoint}`, params).then((res) => res?.data?.data),
  getDetail: async ({ id }) =>
    await api.get(`${LocationEndpoint}/${id}`).then((res) => res?.data?.data),
  create: async ({ params }) =>
    await api.post(`${LocationEndpoint}`, params).then((res) => res?.data),
  update: async ({ id, params }) =>
    await api.put(`${LocationEndpoint}/${id}`, params).then((res) => res?.data),
  delete: async ({ id }) =>
    await api.delete(`${LocationEndpoint}/${id}`).then((res) => res?.data),
};

export default LocationApi;
