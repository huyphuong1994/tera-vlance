export interface IFilter {
  parent_menu_id: number;
  status: string;
  business_id: number;
}

export interface IParams {
  keyword: string;
}

export interface IFormCopy {
  page_root_id: string | number;
  page_current_id?: string | number;
  config_controls: string[];
  config_tables: string[];
  config_columns: string[];
  config_forms: string[];
  config_fields: string[];
}
