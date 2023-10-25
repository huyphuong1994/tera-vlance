import { IPagination } from '_common/interface';

export interface IParamsList extends IPagination {
  keyword?: string;
  page_id?: number;
}

export interface IParamsOrderForm {
  page_id: number;
  group_id: number;
}

export interface IParamsOrderField {
  form_id: number;
}
