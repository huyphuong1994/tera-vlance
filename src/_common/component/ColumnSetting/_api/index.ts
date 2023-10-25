import { endpoint } from '_common/constants/common';
import api from 'states/drivers';

const pageTableColumnEndpoint = `${endpoint}/administrator/page-table-column`;
interface ParamType<T> {
  params?: T;
}

const PageTableColumnAPI = {
  getList: async <T>({ params }: ParamType<T>) =>
    await api
      .get(`${pageTableColumnEndpoint}/list`, params)
      .then((result) => result.data?.data),

  hideColumn: async ({ id, params }) =>
    await api
      .put(`${pageTableColumnEndpoint}/change-show-hide/${id}`, params)
      .then((result) => result.data),

  sortColumn: async ({ params }) =>
    await api
      .put(`${pageTableColumnEndpoint}/sort`, params)
      .then((result) => result.data),
};

export default PageTableColumnAPI;
