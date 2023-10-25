import { authEndpoint } from '_common/constants/common';
import api from 'states/drivers';

export const AuthApi = {
  getDeviceCode: async () =>
    await api
      .post(`${authEndpoint}/device/init`)
      .then((result) => result.data?.data),
  checkAuth: async (params) =>
    await api
      .post(`${authEndpoint}/auth/check-auth`, params)
      .then((result) => result.data),
  logout: async () => await api.post(`${authEndpoint}/auth/logout`),
  getProfile: async () =>
    await api.get(`${authEndpoint}/auth/profile`).then((result) => result.data),
  getPermissions: async () =>
    await api
      .get(`${authEndpoint}/auth/get-permissions`)
      .then((result) => result.data),
  getEpic: async (params) =>
    await api
      .get(`${authEndpoint}/auth/get-epics`, params)
      .then((result) => result.data),
};
