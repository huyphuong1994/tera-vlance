import { endpoint } from '../../../../_common/constants/common';
import api from '../../../../states/drivers';
import { IFormManeuverItem } from '../interfaces';

const ManeuverApi = `${endpoint}/eqp/project`;

export const ManeuverPageApi = {
  getEqpManeuverList: async ({ params }: any) =>
    await api
      .get(`${ManeuverApi}/list`, params)
      .then((result) => result.data?.data),
  getManeuverDetail: async (id: string | number) =>
    await api
      .get(`${ManeuverApi}/detail/${id}`)
      .then((result) => result.data?.data),
  deleteManeuver: async (id: string | number) =>
    await api
      .delete(`${ManeuverApi}/delete/${id}`)
      .then((result) => result.data),
  createManeuver: async (param: IFormManeuverItem) =>
    await api
      .post(`${ManeuverApi}/create`, param)
      .then((result) => result.data),
  updateManeuver: async (param: IFormManeuverItem, id: number | string) =>
    await api
      .put(`${ManeuverApi}/update/${id}`, param)
      .then((result) => result.data),
};

export default ManeuverPageApi;
