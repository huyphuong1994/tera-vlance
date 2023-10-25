import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const OptionEndpoint = `${endpoint}/crm/options`;

const OptionApi = {
  getList: async ({ params }) =>
    await api
      .get(`${OptionEndpoint}`, params)
      .then((res) => res?.data?.data?.data),
  getDetail: async ({ id }) =>
    await api.get(`${OptionEndpoint}/${id}`).then((res) => res?.data),
  create: async ({ params }) =>
    await api.post(`${OptionEndpoint}`, params).then((res) => res?.data),
  update: async ({ id, params }) =>
    await api.put(`${OptionEndpoint}/${id}`, params).then((res) => res?.data),
  delete: async ({ id }) =>
    await api.delete(`${OptionEndpoint}/${id}`).then((res) => res?.data),
};

export default OptionApi;
