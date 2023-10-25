// import { endpointMockData } from '_common/constants/common';
import { filterField } from '_common/utils';
import api from 'states/drivers';
import {
  IParamsList,
  IParamsOrderField,
  // IParamsOrderForm,
} from '../interfaces';
import { endpoint } from '_common/constants/common';
import { TParamsApi } from '_common/interface/api';
import { RequestImport } from '../../interfaces';

const FormConfigEndpoint = `${endpoint}/administrator/form-data`;
const FieldConfigEndpoint = `${endpoint}/administrator/form-field`;

const FormConfigApi = {
  getList: async (param?: IParamsList) =>
    await api
      .get(`${FormConfigEndpoint}/list`, filterField(param))
      .then((result) => result?.data?.data),
  getDetail: async (id: string | number) =>
    await api
      .get(`${FormConfigEndpoint}/detail/${id}`)
      .then((result) => result?.data?.data),
  getFormGroup: async (param) =>
    await api
      .get(`${FormConfigEndpoint}/group-form`, param)
      .then((result) => result?.data?.data),
  getFormOrder: async (param: TParamsApi) =>
    await api
      .get(`${FormConfigEndpoint}/control-of-group`, param)
      .then((result) => result?.data?.data),
  getListPageCopy: async (param) =>
    await api
      .get(`${FormConfigEndpoint}/list-page`, param)
      .then((result) => result?.data?.data),
  getListFieldCopy: async (param) =>
    await api
      .get(`${FormConfigEndpoint}/list-field-of-form`, param)
      .then((result) => result?.data?.data),
  cloneData: async (param) =>
    await api
      .post(`${FormConfigEndpoint}/clone-data`, param)
      .then((result) => result.data),
  create: async (param) =>
    await api
      .post(`${FormConfigEndpoint}/create`, param)
      .then((result) => result.data),
  update: async (id: string | number, param) =>
    await api
      .put(`${FormConfigEndpoint}/update/${id}`, param)
      .then((result) => result?.data),
  delete: async (id: string | number) =>
    await api
      .delete(`${FormConfigEndpoint}/delete/${id}`)
      .then((result) => result?.data),
  export: async (param) =>
    await api
      .post(`${FormConfigEndpoint}/export`, param)
      .then((result) => result?.data),
  import: async (params: RequestImport) =>
    await api
      .post(`${FormConfigEndpoint}/import`, params)
      .then((result) => result?.data),
};

export const FieldConfigApi = {
  getList: async (param?: IParamsList) =>
    await api
      .get(`${FieldConfigEndpoint}/list`, filterField(param))
      .then((result) => result?.data?.data),
  getDetail: async (id: string | number) =>
    await api
      .get(`${FieldConfigEndpoint}/detail/${id}`)
      .then((result) => result?.data?.data),
  getFieldType: async () =>
    await api
      .get(`${FieldConfigEndpoint}/list-type`)
      .then((result) => result?.data?.data),
  getFieldOrder: async (param: IParamsOrderField) =>
    await api
      .get(`${FieldConfigEndpoint}/field-of-form`, param)
      .then((result) => result?.data?.data),
  create: async (param) =>
    await api
      .post(`${FieldConfigEndpoint}/create`, param)
      .then((result) => result.data),
  update: async (id: string | number, param) =>
    await api
      .put(`${FieldConfigEndpoint}/update/${id}`, param)
      .then((result) => result?.data),
  delete: async (id: string | number) =>
    await api
      .delete(`${FieldConfigEndpoint}/delete/${id}`)
      .then((result) => result?.data),
  export: async (param) =>
    await api
      .post(`${FieldConfigEndpoint}/export`, param)
      .then((result) => result?.data),
  import: async (params: RequestImport) =>
    await api
      .post(`${FieldConfigEndpoint}/import`, params)
      .then((result) => result?.data),
};

export default FormConfigApi;
