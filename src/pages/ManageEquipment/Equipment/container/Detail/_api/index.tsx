import { endpoint } from '../../../../../../_common/constants/common';
import api from '../../../../../../states/drivers';
import { IFormEquipmentFix, IFormEquipmentManeuver } from '../interfaces';

const EquipmentFixUrl = `${endpoint}/eqp/fix`;
const EquipmentManeuverUrl = `${endpoint}/eqp/project`;
const EquipmentDocumentUrl = `${endpoint}/eqp/registry`;
const EquipmentInsuranceUrl = `${endpoint}/eqp/insurance`;

const EquipmentFixApi = {
  getEquipmentFixList: async ({ params }: any) =>
    await api
      .get(`${EquipmentFixUrl}/list`, params)
      .then((result) => result.data),
  getEquipmentFixDetail: async (id: string | number) =>
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
  updateEquipmentFix: async (param: IFormEquipmentFix, id: string | number) =>
    await api
      .put(`${EquipmentFixUrl}/update/${id}`, param)
      .then((result) => result.data),
};

const EquipmentManeuverApi = {
  getEquipmentManeuverList: async ({ params }: any) =>
    await api
      .get(`${EquipmentManeuverUrl}/list`, params)
      .then((result) => result.data),
  getEquipmentManeuverDetail: async (id: string | number) =>
    await api
      .get(`${EquipmentManeuverUrl}/detail/${id}`)
      .then((result) => result.data?.data),
  createEquipmentManeuver: async (param: IFormEquipmentManeuver) =>
    await api
      .post(`${EquipmentManeuverUrl}/create`, param)
      .then((result) => result.data),
  deleteEquipmentManeuver: async (id: string | number) =>
    await api
      .delete(`${EquipmentManeuverUrl}/delete/${id}`)
      .then((result) => result.data),
  updateEquipmentManeuver: async (
    param: IFormEquipmentManeuver,
    id: string | number,
  ) =>
    await api
      .put(`${EquipmentManeuverUrl}/update/${id}`, param)
      .then((result) => result.data),
};

const EquipmentDocumentApi = {
  getEquipmentDocumentList: async ({ params }: any) =>
    await api
      .get(`${EquipmentDocumentUrl}/list`, params)
      .then((result) => result.data),
  getEquipmentDocumentDetail: async (id: string | number) =>
    await api
      .get(`${EquipmentDocumentUrl}/detail/${id}`)
      .then((result) => result.data?.data),
  createEquipmentDocument: async (param: IFormEquipmentManeuver) =>
    await api
      .post(`${EquipmentDocumentUrl}/create`, param)
      .then((result) => result.data),
  deleteEquipmentDocument: async (id: string | number) =>
    await api
      .delete(`${EquipmentDocumentUrl}/delete/${id}`)
      .then((result) => result.data),
  updateEquipmentDocument: async (
    param: IFormEquipmentManeuver,
    id: string | number,
  ) =>
    await api
      .put(`${EquipmentDocumentUrl}/update/${id}`, param)
      .then((result) => result.data),
};

const EquipmentInsuranceApi = {
  getEquipmentInsuranceList: async ({ params }: any) =>
    await api
      .get(`${EquipmentInsuranceUrl}/list`, params)
      .then((result) => result.data),
  getEquipmentInsuranceDetail: async (id: string | number) =>
    await api
      .get(`${EquipmentInsuranceUrl}/detail/${id}`)
      .then((result) => result.data?.data),
  createEquipmentInsurance: async (param: IFormEquipmentManeuver) =>
    await api
      .post(`${EquipmentInsuranceUrl}/create`, param)
      .then((result) => result.data),
  deleteEquipmentInsurance: async (id: string | number) =>
    await api
      .delete(`${EquipmentInsuranceUrl}/delete/${id}`)
      .then((result) => result.data),
  updateEquipmentInsurance: async (
    param: IFormEquipmentManeuver,
    id: string | number,
  ) =>
    await api
      .put(`${EquipmentInsuranceUrl}/update/${id}`, param)
      .then((result) => result.data),
};

export {
  EquipmentFixApi,
  EquipmentManeuverApi,
  EquipmentDocumentApi,
  EquipmentInsuranceApi,
};
