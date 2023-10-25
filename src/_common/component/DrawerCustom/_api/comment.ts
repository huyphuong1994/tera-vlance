import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const CommentEndPoint = `${endpoint}/portal/comment`;

const CommentApi = {
  getList: async ({ params }) =>
    await api
      .get(`${CommentEndPoint}/list`, params)
      .then((result) => result?.data?.data),
  create: async ({ params }) =>
    await api
      .post(`${CommentEndPoint}/create`, params)
      .then((result) => result.data),
  delete: async (id) =>
    await api
      .delete(`${CommentEndPoint}/delete/${id}`)
      .then((result) => result.data),
};

export default CommentApi;
