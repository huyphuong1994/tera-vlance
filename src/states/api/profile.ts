import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const ProfileEndpoint = `${endpoint}/user`;

export const ProfileApi = {
  changePassword: async ({ params }) =>
    await api
      .post(`${ProfileEndpoint}/change-password`, params)
      .then((result) => result.data),
  changeWalletPassword: async ({ params }) =>
    await api
      .post(`${ProfileEndpoint}/change-wallet-password`, params)
      .then((result) => result.data),
  update: async ({ params }) =>
    await api
      .put(`${ProfileEndpoint}/update-profile`, params)
      .then((result) => result.data),
};
