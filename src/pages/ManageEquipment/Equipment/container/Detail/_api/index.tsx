import { endpoint } from '../../../../../../_common/constants/common';
import api from '../../../../../../states/drivers';
import {
  IFormEquipmentFix,
  IFormEquipmentManeuver,
  IFormInsurance,
  IFormRecord,
  IFormRegistry,
} from '../interfaces';

const EquipmentFixUrl = `${endpoint}/eqp/fix`;
const EquipmentManeuverUrl = `${endpoint}/eqp/project`;
const EquipmentDocumentUrl = `${endpoint}/eqp/registry`;
const EquipmentInsuranceUrl = `${endpoint}/eqp/insurance`;
const EquipmentRecordUrl = `${endpoint}/eqp/brief`;

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

const EquipmentRegistryApi = {
  getEquipmentRegistryList: async ({ params }: any) =>
    await api
      .get(`${EquipmentDocumentUrl}/list`, params)
      .then((result) => result.data),
  getEquipmentRegistryDetail: async (id: string | number) =>
    await api
      .get(`${EquipmentDocumentUrl}/detail/${id}`)
      .then((result) => result.data?.data),
  createEquipmentRegistry: async (param: IFormRegistry) =>
    await api
      .post(`${EquipmentDocumentUrl}/create`, param)
      .then((result) => result.data),
  deleteEquipmentRegistry: async (id: string | number) =>
    await api
      .delete(`${EquipmentDocumentUrl}/delete/${id}`)
      .then((result) => result.data),
  updateEquipmentRegistry: async (param: IFormRegistry, id: string | number) =>
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
  createEquipmentInsurance: async (param: IFormInsurance) =>
    await api
      .post(`${EquipmentInsuranceUrl}/create`, param)
      .then((result) => result.data),
  deleteEquipmentInsurance: async (id: string | number) =>
    await api
      .delete(`${EquipmentInsuranceUrl}/delete/${id}`)
      .then((result) => result.data),
  updateEquipmentInsurance: async (
    param: IFormInsurance,
    id: string | number,
  ) =>
    await api
      .put(`${EquipmentInsuranceUrl}/update/${id}`, param)
      .then((result) => result.data),
};

const EquipmentRecordApi = {
  getEquipmentRecordList: async ({ params }: any) =>
    await api
      .get(`${EquipmentRecordUrl}/list`, params)
      .then((result) => result.data),
  getEquipmentRecordDetail: async (id: string | number) =>
    await api
      .get(`${EquipmentRecordUrl}/detail/${id}`)
      .then((result) => result.data?.data),
  createEquipmentRecord: async (param: IFormRecord) =>
    await api
      .post(`${EquipmentRecordUrl}/create`, param)
      .then((result) => result.data),
  deleteEquipmentRecord: async (id: string | number) =>
    await api
      .delete(`${EquipmentRecordUrl}/delete/${id}`)
      .then((result) => result.data),
  updateEquipmentRecord: async (param: IFormRecord, id: string | number) =>
    await api
      .put(`${EquipmentRecordUrl}/update/${id}`, param)
      .then((result) => result.data),
};

export {
  EquipmentFixApi,
  EquipmentManeuverApi,
  EquipmentRegistryApi,
  EquipmentInsuranceApi,
  EquipmentRecordApi,
};
