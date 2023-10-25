import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const SystemTableConfigEndpoint = `${endpoint}/administrator/page-table`;

const SystemTableConfigApi = {
  getGroupList: async ({ params }: any) =>
    await api
      .get(`${SystemTableConfigEndpoint}/list-group`, params)
      .then((result) => result.data?.data),
  getList: async ({ params }: any) =>
    await api
      .get(`${SystemTableConfigEndpoint}/list`, params)
      .then((result) => result.data?.data),
  getDetail: async ({ id }) =>
    await api
      .get(`${SystemTableConfigEndpoint}/detail/${id}`)
      .then((result) => result.data?.data),
  create: async (param: any) =>
    await api
      .post(`${SystemTableConfigEndpoint}/create`, param)
      .then((result) => result.data),

  update: async ({ id, params }) =>
    await api
      .put(`${SystemTableConfigEndpoint}/update/${id}`, params)
      .then((result) => result.data),
  clone: async ({ params }) =>
    await api
      .put(`${SystemTableConfigEndpoint}/clone`, params)
      .then((result) => result.data),
  delete: async ({ id }) =>
    await api
      .delete(`${SystemTableConfigEndpoint}/delete/${id}`)
      .then((result) => result?.data),
  import: async (param: any) => {
    return await api
      .post(`${SystemTableConfigEndpoint}/import`, param)
      .then((result) => result.data);
  },
  export: async (param: any) => {
    return await api
      .post(`${SystemTableConfigEndpoint}/export`, param)
      .then((result) => result.data);
  },
  getConfig: async (params: any) =>
    await api
      .get(`${SystemTableConfigEndpoint}/get-config`, params)
      .then((result) => result.data?.data),
};

export default SystemTableConfigApi;
