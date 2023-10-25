import { endpoint } from '_common/constants/common';
import { filterField } from '_common/utils';
import api from 'states/drivers';
import { IFormCopy } from '../interfaces';

const ManagePageEndpoint = `${endpoint}/administrator/page`;
const ParentMenuEndpoint = `${endpoint}/administrator/page-menu`;

const ManagePageApi = {
  getList: async (param?) =>
    await api
      .get(`${ManagePageEndpoint}/list`, filterField(param))
      .then((result) => result.data?.data),
  getDetail: async (id: string | number) =>
    await api
      .get(`${ManagePageEndpoint}/detail/${id}`)
      .then((result) => result.data?.data),
  getConfig: async (params) =>
    await api
      .get(`${ManagePageEndpoint}/get-config`, params)
      .then((result) => result.data?.data),
  getDetailByPath: async (path: string) =>
    await api
      .get(`${ManagePageEndpoint}/detail/`, { path })
      .then((result) => result.data?.data),
  getParentMenuList: async (param?) =>
    await api
      .get(`${ParentMenuEndpoint}/list`, filterField(param))
      .then((result) => result.data?.data),
  create: async (param) =>
    await api
      .post(`${ManagePageEndpoint}/create`, param)
      .then((result) => result.data),
  update: async (id: string | number, param) =>
    await api
      .put(`${ManagePageEndpoint}/update/${id}`, param)
      .then((result) => result.data),
  delete: async (id: string | number) =>
    await api
      .delete(`${ManagePageEndpoint}/delete/${id}`)
      .then((result) => result.data),
  copy: async (params: IFormCopy) =>
    await api
      .put(`${ManagePageEndpoint}/clone`, params)
      .then((result) => result.data),
  import: async (params?) =>
    await api
      .post(`${ManagePageEndpoint}/import`, params)
      .then((result) => result.data),
  export: async (params?) =>
    await api
      .post(`${ManagePageEndpoint}/export`, params)
      .then((result) => result.data),
};

export default ManagePageApi;
