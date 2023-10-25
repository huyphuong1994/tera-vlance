import { EmployeeCreated } from '_common/interface';

export interface QuerySearch {
  keyword?: string;
  group?: string;
  role_id?: number;
}
export interface IForm {
  code?: string;
  title?: string;
  note?: string;
}
export interface RequestCopy extends CopyForm {
  role_target_id: number;
}
export interface CopyForm {
  role_id: number;
}
export interface RequestSetting {
  role_id: number;
  permission_id: number[];
}

export interface ListRole {
  id: number;
  code: string;
  title: string;
  note: string;
  record_number: number;
  code_guard: string;
  created_at: string;
  created_at_format: string;
  created_by: number;
  updated_at: string;
  updated_at_format: string;
  updated_by: number;
}
export interface ResponseDetailRole extends ListRole {
  employee_created: EmployeeCreated;
  employee_updated: EmployeeCreated;
}
