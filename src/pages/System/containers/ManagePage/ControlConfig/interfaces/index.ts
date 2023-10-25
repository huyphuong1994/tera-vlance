import { EmployeeCreated, IPagination } from '_common/interface';
import { StatusEmployee } from 'pages/System/constants';

export interface IParams extends IPagination {
  page_id?: number;
  keyword?: string;
}
export interface IForm {
  code: string;
  title: string;
  value: string;
  color: string;
  class_name: string;
  group_id: number;
  order: number;
  status: boolean;
}

export interface RequestControl extends Omit<IForm, 'status'> {
  status: StatusEmployee;
  page_id: number;
}
export interface ResponseDetailControl extends RequestControl {
  id: number;
  group_control: GroupControl;
  status_text: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
  created_by: string;
  created_at_format: string;
  updated_at_format: string;
  employee_created: EmployeeCreated;
  employee_updated: EmployeeCreated;
  item_prev_order?: ItemPrevOrder;
  code_guard: string;
}

interface ItemPrevOrder {
  id: number;
  title: string;
  order: number;
  page_id: number;
  status_text: string;
}
export interface GroupControl {
  id: number;
  title: string;
  code: string;
}
export interface ListOrderControl {
  id: number;
  order: number;
  record_number: number;
  title: string;
}

export interface FormCopyControl {
  page_target_id: number;
  control_selected: (number | string)[] | string;
}
export interface RequestCopyControl extends FormCopyControl {
  page_id: number;
}
