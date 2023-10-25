import { endpoint } from '_common/constants/common';
import api from 'states/drivers';
import { filterField } from '_common/utils';

const SelectWrapperEndpoint = `${endpoint}/administrator/page-api`;

const SelectWrapperApi = {
  getDataSource: async (param?) =>
    await api
      .get(`${SelectWrapperEndpoint}/list`, filterField(param))
      .then((result) => result?.data),
  getListDataSource: async (url, param?) =>
    await api
      .get(`${endpoint}${url}`, filterField(param))
      .then((result) => result?.data),
  getListTest: async (type, param?) =>
    await api
      .get(`${endpoint}/hrm/${type}/list`, filterField(param))
      .then((result) => result?.data),
};

export default SelectWrapperApi;
