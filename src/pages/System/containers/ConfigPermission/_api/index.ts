import { endpoint } from '_common/constants/common';
import { IPagination } from '_common/interface';
import api from 'states/drivers';
import { RequestImport } from '../../ManagePage/interfaces';
import { IForm, QuerySearch, RequestCopy, RequestSetting } from '../interfaces';

const ConfigPermissionEndpoint = `${endpoint}/administrator/role`;

const ConfigPermissionApi = {
  getList: async (params?: QuerySearch & IPagination) =>
    await api
      .get(`${ConfigPermissionEndpoint}/list`, params)
      .then((result) => result?.data?.data),
  getListConfigControl: async (params?: IPagination) =>
    await api
      .get(`${ConfigPermissionEndpoint}/list-config-control`, params)
      .then((result) => result?.data?.data),
  getListRoleHasPermission: async (role_id: number) =>
    await api
      .get(`${ConfigPermissionEndpoint}/role-has-permission`, {
        role_id: role_id,
      })
      .then((result) => result?.data?.data),
  getDetail: async (id: string | number) =>
    await api
      .get(`${ConfigPermissionEndpoint}/detail/${id}`)
      .then((result) => result?.data?.data),
  create: async (params: IForm) =>
    await api
      .post(`${ConfigPermissionEndpoint}/create`, params)
      .then((result) => result.data),
  update: async (id: string | number, params: IForm) =>
    await api
      .put(`${ConfigPermissionEndpoint}/update/${id}`, params)
      .then((result) => result.data),
  setting: async (params: RequestSetting) =>
    await api
      .put(`${ConfigPermissionEndpoint}/config-permission`, params)
      .then((result) => result.data),
  delete: async (id: string | number) =>
    await api
      .delete(`${ConfigPermissionEndpoint}/delete/${id}`)
      .then((result) => result.data),
  copy: async (params: RequestCopy) =>
    await api
      .post(`${ConfigPermissionEndpoint}/clone-data`, params)
      .then((result) => result.data),
  export: async (id_selected: number[]) =>
    await api
      .post(`${ConfigPermissionEndpoint}/export`, { id_selected })
      .then((result) => result?.data),
  import: async (params: RequestImport) =>
    await api
      .post(`${ConfigPermissionEndpoint}/import`, params)
      .then((result) => result?.data),
};

export default ConfigPermissionApi;
