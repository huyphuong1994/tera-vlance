import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const TaxEndpoint = `${endpoint}/crm/tax`;

const TaxApi = {
  getList: async ({ params }) => await api.get(`${TaxEndpoint}/list`, params),
  getDetail: async ({ id }) => await api.get(`${TaxEndpoint}/detail/${id}`),
  create: async ({ params }) => await api.post(`${TaxEndpoint}`, params),
  update: async ({ id, params }) =>
    await api.put(`${TaxEndpoint}/${id}`, params),
  delete: async ({ id }) => await api.delete(`${TaxEndpoint}/${id}`),
};

export default TaxApi;
