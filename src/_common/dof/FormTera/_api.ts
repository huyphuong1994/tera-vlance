import api from 'states/drivers';
import { endpoint } from '_common/constants/common';

const FormConfigEndpoint = `${endpoint}/administrator/form-data`;

const FormConfigApi = {
  getConfig: async (params: any) =>
    await api
      .get(`${FormConfigEndpoint}/get-config`, params)
      .then((result) => result?.data?.data),
};

export default FormConfigApi;
