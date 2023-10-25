import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const EmployeeInfoEndpoint = `${endpoint}/crm/employee`;

const EmployeeInfoApi = {
  getList: async () =>
    await api.get(`${EmployeeInfoEndpoint}`).then((res) => res?.data?.data),
  getDetail: async ({ id }) =>
    await api
      .get(`${EmployeeInfoEndpoint}/${id}`)
      .then((res) => res?.data?.data),
  getInfo: async (param) =>
    await api
      .get(`${EmployeeInfoEndpoint}/get-info`, param)
      .then((res) => res?.data?.data),
  create: async ({ params }) =>
    await api.post(`${EmployeeInfoEndpoint}`, params).then((res) => res?.data),
  update: async ({ id, params }) =>
    await api
      .put(`${EmployeeInfoEndpoint}/${id}`, params)
      .then((res) => res?.data),
  delete: async ({ id }) =>
    await api.delete(`${EmployeeInfoEndpoint}/${id}`).then((res) => res?.data),
};

export default EmployeeInfoApi;
