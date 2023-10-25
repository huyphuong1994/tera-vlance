import { endpoint } from '../../../../_common/constants/common';
import api from '../../../../states/drivers';
import { IFormMaterial } from '../interfaces';

const MaterialApi = `${endpoint}/eqp/category`;

export const MaterialPageApi = {
  getMaterialList: async ({ params }: any) =>
    await api
      .get(`${MaterialApi}/list`, params)
      .then((result) => result.data?.data),
  getMaterialDetail: async (id: string | number) =>
    await api
      .get(`${MaterialApi}/detail/${id}`)
      .then((result) => result.data?.data),
  deleteMaterial: async (id: string | number) =>
    await api
      .delete(`${MaterialApi}/delete/${id}`)
      .then((result) => result.data),
  createMaterial: async (param: IFormMaterial) =>
    await api
      .post(`${MaterialApi}/create`, param)
      .then((result) => result.data),
  updateMaterial: async (param: IFormMaterial, id: number) =>
    await api
      .put(`${MaterialApi}/update/${id}`, param)
      .then((result) => result.data),
};

export default MaterialPageApi;
