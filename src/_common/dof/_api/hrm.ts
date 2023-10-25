import { HrmEndpoint } from '_common/constants/common';
import api from 'states/drivers';

const HrmEndpointUrl = `${HrmEndpoint}/hrm`;

const HrmApi = {
  getListEmployee: async (param?) =>
    await api
      .get(`${HrmEndpointUrl}/employee/list`, param)
      .then((result) => result?.data?.data),
  getListDepartment: async (param?) =>
    await api
      .get(`${HrmEndpointUrl}/department/list`, param)
      .then((result) => result?.data?.data),
  getListJobTitle: async (param?) =>
    await api
      .get(`${HrmEndpointUrl}/jobtitle/list`, param)
      .then((result) => result?.data?.data),
  getListPosition: async (param?) =>
    await api
      .get(`${HrmEndpointUrl}/position/list`, param)
      .then((result) => result?.data?.data),
  getListConfigLeave: async (param?) =>
    await api
      .get(`${HrmEndpointUrl}/config-leave/list`, param)
      .then((result) => result?.data?.data),
  getListEmployeeShift: async (param?) =>
    await api
      .get(`${HrmEndpointUrl}/employee-shift/list`, param)
      .then((result) => result?.data?.data),
  getListCity: async (param?) =>
    await api
      .get(`${HrmEndpointUrl}/city/list`, param)
      .then((result) => result?.data?.data),
  getListDistrict: async (id?, param?) =>
    await api
      .get(`${HrmEndpointUrl}/district/list`, { city_id: id, ...param })
      .then((result) => result?.data?.data),
  getListWard: async (id?, param?) =>
    await api
      .get(`${HrmEndpointUrl}/ward/list`, { district_id: id, ...param })
      .then((result) => result?.data?.data),
};

export default HrmApi;
