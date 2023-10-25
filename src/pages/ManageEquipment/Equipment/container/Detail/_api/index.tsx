import { endpoint } from '../../../../../../_common/constants/common';
import api from '../../../../../../states/drivers';
import { IFormEquipmentFix } from '../interfaces';

const EquipmentFixUrl = `${endpoint}/eqp/fix`;

const EquipmentFixApi = {
  getEquipmentFixList: async ({ params }: any) =>
    await api
      .get(`${EquipmentFixUrl}/list`, params)
      .then((result) => result.data),
  getEquipmentFix: async (id: string | number) =>
    await api
      .get(`${EquipmentFixUrl}/detail/${id}`)
      .then((result) => result.data?.data),
  createEquipmentFix: async (param: IFormEquipmentFix) =>
    await api
      .post(`${EquipmentFixUrl}/create`, param)
      .then((result) => result.data),
  deleteEquipmentFix: async (id: string | number) =>
    await api
      .delete(`${EquipmentFixUrl}/delete/${id}`)
      .then((result) => result.data),
};

export default EquipmentFixApi;
