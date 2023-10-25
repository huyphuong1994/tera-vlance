import { endpoint } from '_common/constants/common';
import api from 'states/drivers';
import { RequestImport } from '../../interfaces';
import {
  IParams,
  ListOrderControl,
  RequestControl,
  RequestCopyControl,
} from '../interfaces';

const ControlConfigEndpoint = `${endpoint}/administrator/page-control`;

const ControlConfigApi = {
  getList: async (params: IParams) =>
    await api
      .get(`${ControlConfigEndpoint}/list`, params)
      .then((result) => result.data?.data),
  getDetail: async (id: number) =>
    await api
      .get(`${ControlConfigEndpoint}/detail/${id}`)
      .then((result) => result.data?.data),
  getListGroupControl: async () =>
    await api
      .get(`${ControlConfigEndpoint}/group-control`)
      .then((result) => result.data?.data?.data),
  getListOrderControl: async (params: {
    page_id: number;
    group_id: number;
  }): Promise<ListOrderControl[]> =>
    await api
      .get(`${ControlConfigEndpoint}/control-of-group`, params)
      .then((result) => result.data?.data),
  create: async (params: RequestControl) =>
    await api
      .post(`${ControlConfigEndpoint}/create`, params)
      .then((result) => result.data),
  copy: async (params: RequestCopyControl) =>
    await api
      .post(`${ControlConfigEndpoint}/clone-data`, params)
      .then((result) => result.data),
  update: async (params: { id: number; values: RequestControl }) =>
    await api
      .put(`${ControlConfigEndpoint}/update/${params.id}`, params.values)
      .then((result) => result.data),
  delete: async (id: number) =>
    await api
      .delete(`${ControlConfigEndpoint}/delete/${id}`)
      .then((result) => result?.data),
  export: async (params: { page_id: number; id_selected: number[] }) =>
    await api
      .post(`${ControlConfigEndpoint}/export`, params)
      .then((result) => result?.data),
  import: async (params: RequestImport) =>
    await api
      .post(`${ControlConfigEndpoint}/import`, params)
      .then((result) => result?.data),
};

export default ControlConfigApi;
