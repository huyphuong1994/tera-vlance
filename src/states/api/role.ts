import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const RoleEndpoint = `${endpoint}/crm/user/role`;

export const RoleApi = {
  getList: async (params) =>
    await api
      .get(`${RoleEndpoint}/list`, params)
      .then((result) => result?.data?.data),
  getDetail: async ({ id }) =>
    await api
      .get(`${RoleEndpoint}/detail/${id}`)
      .then((res) => res?.data?.data),
  create: async ({ params }) =>
    await api.post(`${RoleEndpoint}`, params).then((res) => res?.data),
  update: async ({ id, params }) =>
    await api
      .put(`${RoleEndpoint}/update/${id}`, params)
      .then((res) => res?.data),
  delete: async ({ id }) =>
    await api.delete(`${RoleEndpoint}/${id}`).then((res) => res?.data),
};
