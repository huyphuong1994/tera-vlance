import { endpoint } from '../../../../_common/constants/common';
import api from '../../../../states/drivers';
import { IFormEquipment } from '../interfaces';

const EquipmentApi = `${endpoint}/eqp/equipment`;

const EquipmentPageApi = {
  getEquipmentList: async ({ params }: any) =>
    await api
      .get(`${EquipmentApi}/list`, params)
      .then((result) => result.data?.data),
  getDetailEquipment: async (id: string | number) =>
    await api
      .get(`${EquipmentApi}/detail/${id}`)
      .then((result) => result.data?.data),
  deleteEquipment: async (id: string | number) =>
    await api
      .delete(`${EquipmentApi}/delete/${id}`)
      .then((result) => result.data),
  createEquipment: async (param: IFormEquipment) =>
    await api
      .post(`${EquipmentApi}/create`, param)
      .then((result) => result.data),
  updateEquipment: async (param: IFormEquipment, id: string | number) =>
    await api
      .put(`${EquipmentApi}/update/${id}`, param)
      .then((result) => result.data),
};

export default EquipmentPageApi;
