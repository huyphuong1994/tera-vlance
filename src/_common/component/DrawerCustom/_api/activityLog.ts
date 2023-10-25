import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const ActivityLogEndPoint = `${endpoint}/portal/activity-log`;

const ActivityLogApi = {
  getList: async ({ params }) =>
    await api
      .get(`${ActivityLogEndPoint}/list`, params)
      .then((result) => result?.data?.data),
};

export default ActivityLogApi;
