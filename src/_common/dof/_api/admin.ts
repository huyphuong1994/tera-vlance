import { endpoint } from '_common/constants/common';
import { parserParamsArray } from '_common/utils';
import api from 'states/drivers';

const AdministratorEndpoint = `${endpoint}/administrator`;

const AdministratorApi = {
  getListPageConfig: async (param?) =>
    await api
      .get(`${AdministratorEndpoint}/page/list`, param)
      .then((result) => result?.data?.data),
  getListTableConfig: async (param?) =>
    await api
      .get(`${AdministratorEndpoint}/page-table/list`, param)
      .then((result) => result?.data?.data),
  getListFormConfig: async (param?) =>
    await api
      .get(`${AdministratorEndpoint}/form-data/list`, param)
      .then((result) => result?.data?.data),
  getListFieldConfig: async (param?) =>
    await api
      .get(`${AdministratorEndpoint}/form-field/list`, parserParamsArray(param))
      .then((result) => result?.data?.data),
  getListControlConfig: async (param?) =>
    await api
      .get(`${AdministratorEndpoint}/page-control/list`, param)
      .then((result) => result?.data?.data),
  getListColumnConfig: async (param?) =>
    await api
      .get(
        `${AdministratorEndpoint}/page-table-column/list`,
        parserParamsArray(param),
      )
      .then((result) => result?.data?.data),
  getListIcon: async (param?) =>
    await api
      .get(`${AdministratorEndpoint}/icon/list`, param)
      .then((result) => result?.data),
};

export default AdministratorApi;
