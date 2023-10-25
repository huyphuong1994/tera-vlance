import { endpoint } from '../../../../_common/constants/common';
import api from '../../../../states/drivers';
import { IFormCategory } from '../interfaces';

const EquipmentCategoryApi = `${endpoint}/eqp/category`;

export const CategoryPageApi = {
  getEqpCategoryList: async ({ params }: any) =>
    await api
      .get(`${EquipmentCategoryApi}/list`, params)
      .then((result) => result.data?.data),
  getDetailCategory: async (id: string | number) =>
    await api
      .get(`${EquipmentCategoryApi}/detail/${id}`)
      .then((result) => result.data?.data),
  deleteCategory: async (id: string | number) =>
    await api
      .delete(`${EquipmentCategoryApi}/delete/${id}`)
      .then((result) => result.data),
  createCategory: async (param: IFormCategory) =>
    await api
      .post(`${EquipmentCategoryApi}/create`, param)
      .then((result) => result.data),
  updateCategory: async (param: IFormCategory, id: number) =>
    await api
      .put(`${EquipmentCategoryApi}/update/${id}`, param)
      .then((result) => result.data),
};

export default CategoryPageApi;
