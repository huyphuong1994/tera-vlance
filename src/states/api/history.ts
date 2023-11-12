import { PortalEndpoint } from '_common/constants/common';
import api from 'states/drivers';

const ActivityLog = `${PortalEndpoint}/portal/activity-log`;

const PortalLogApi = {
  getList: async ({ params }: any) =>
    await api
      .get(`${ActivityLog}/list`, params)
      .then((result) => result.data?.data),
};

export default PortalLogApi;
