export interface IFormModel {
  open: boolean;
  id?: number;
}

export interface IFilter {
  parent_menu_id: number;
  status: string;
  business_id: number;
}

export interface IItemSummary {
  status: string;
  total_count: number;
}

export interface IFormEquipment {
  name: string;
  code: string;
  group_code: string;
  attribute: string;
  made_in: string;
  made_at: string;
  used_at: string;
  origin_value: number;
  remain_value: number;
  depreciation_unit: string;
  return_expected_at: string;
  wait_work_at: string;
}
