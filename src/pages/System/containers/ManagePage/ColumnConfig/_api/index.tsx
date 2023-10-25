import { endpoint } from '_common/constants/common';
import { parserParamsArray } from '_common/utils';
import api from 'states/drivers';
import { IForm } from '../interfaces';

const ColumnConfigEndpoint = `${endpoint}/administrator/page-table-column`;

const ColumnConfigApi = {
  getList: async (param?) =>
    await api
      .get(`${ColumnConfigEndpoint}/list`, parserParamsArray(param))
      .then((result) => result.data?.data),
  getDetail: async (id: string | number) =>
    await api
      .get(`${ColumnConfigEndpoint}/detail/${id}`)
      .then((result) => result.data?.data),
  create: async (param: IForm) =>
    await api
      .post(`${ColumnConfigEndpoint}/create`, param)
      .then((result) => result.data),
  update: async (id: string | number, param: IForm) =>
    await api
      .put(`${ColumnConfigEndpoint}/update/${id}`, param)
      .then((result) => result.data),
  delete: async (id: string | number) =>
    await api
      .delete(`${ColumnConfigEndpoint}/delete/${id}`)
      .then((result) => result.data),
  import: async (params?) =>
    await api
      .post(`${ColumnConfigEndpoint}/import`, params)
      .then((result) => result.data),
  export: async (params?) =>
    await api
      .post(`${ColumnConfigEndpoint}/export`, params)
      .then((result) => result.data),
};

export default ColumnConfigApi;
