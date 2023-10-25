import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const AttachmentEndPoint = `${endpoint}/portal/attachment`;

const AttachmentApi = {
  getList: async ({ params }) =>
    await api
      .get(`${AttachmentEndPoint}/list`, params)
      .then((result) => result?.data?.data),

  update: async (params) =>
    await api
      .put(`${AttachmentEndPoint}/update`, params)
      .then((result) => result?.data),
};

export default AttachmentApi;
