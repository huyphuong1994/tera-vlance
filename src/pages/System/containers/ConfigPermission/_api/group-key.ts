import { endpoint } from '_common/constants/common';
import { QuerySearch } from '../interfaces';
import api from 'states/drivers';
const ConfigPermissionEndpoint = `${endpoint}/administrator/group-list`;
const GroupKeyApi = {
  getListKey: async (params: QuerySearch) =>
    await api
      .get(`${ConfigPermissionEndpoint}/list`, params)
      .then((result) => result?.data?.data),
  getListGroup: async () =>
    await api
      .get(`${ConfigPermissionEndpoint}/group`)
      .then((result) => result?.data?.data),
};
export default GroupKeyApi;
