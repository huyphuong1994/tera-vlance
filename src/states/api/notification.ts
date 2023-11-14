import { PortalEndpoint } from '_common/constants/common';
import api from 'states/drivers';

const NotificationUrl = `${PortalEndpoint}/portal/notification`;

const NotificationApi = {
  getList: async ({ params }: any) =>
    await api
      .get(`${NotificationUrl}/list`, params)
      .then((result) => result.data?.data),
};

export default NotificationApi;
