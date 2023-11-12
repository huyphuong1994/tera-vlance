import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const ProjectUrl = `${endpoint}/work/project`;

const ProjectApi = {
  getList: async ({ params }: any) =>
    await api
      .get(`${ProjectUrl}/list`, params)
      .then((result) => result.data?.data),
};

export default ProjectApi;
