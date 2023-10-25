import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const AddressEndpoint = `${endpoint}/hrm`;

const AddressApi = {
  getListCity: async () =>
    await api
      .get(`${AddressEndpoint}/city/list`, { limit: 100 })
      .then((result) => result.data?.data),
  getDetailCity: async ({ id }) =>
    await api
      .get(`${AddressEndpoint}/city/detail/${id}`)
      .then((result) => result.data?.data),
  getListDistrict: async (params: number) =>
    await api
      .get(`${AddressEndpoint}/district/list`, { city_id: params, limit: 100 })
      .then((result) => result.data?.data),
  getDetailDistrict: async ({ id }) =>
    await api
      .get(`${AddressEndpoint}/district/detail/${id}`)
      .then((result) => result.data?.data),
  getListWard: async (params: number) =>
    await api
      .get(`${AddressEndpoint}/ward/list`, { district_id: params, limit: 100 })
      .then((result) => result.data?.data),
  getDetailWard: async ({ id }) =>
    await api
      .get(`${AddressEndpoint}/ward/detail/${id}`)
      .then((result) => result.data?.data),
};

export default AddressApi;
