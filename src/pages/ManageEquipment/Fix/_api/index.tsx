import { endpoint } from '../../../../_common/constants/common';
import api from '../../../../states/drivers';
import { IFormFix } from '../interfaces';

const EquipmentFixApi = `${endpoint}/eqp/fix`;

export const FixPageApi = {
  getFixList: async ({ params }: any) =>
    await api
      .get(`${EquipmentFixApi}/list`, params)
      .then((result) => result.data?.data),
  getDetailFix: async (id: string | number) =>
    await api
      .get(`${EquipmentFixApi}/detail/${id}`)
      .then((result) => result.data?.data),
  deleteFix: async (id: string | number) =>
    await api
      .delete(`${EquipmentFixApi}/delete/${id}`)
      .then((result) => result.data),
  createFix: async (param: IFormFix) =>
    await api
      .post(`${EquipmentFixApi}/create`, param)
      .then((result) => result.data),
  updateFix: async (param: IFormFix, id: number) =>
    await api
      .put(`${EquipmentFixApi}/update/${id}`, param)
      .then((result) => result.data),
};

export default FixPageApi;
