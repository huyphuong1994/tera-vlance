export interface IParams {
  keyword: string;
}

export interface ImportColumn {
  file: string;
  overwrite: boolean;
  table_id: number | string;
}
export interface ExportColumn {
  id_selected: React.Key[];
  table_id: number;
}

export interface IForm {
  code: string;
  title: string;
  type: string;
  key: string;
  class_name: string;
  width: number;
  unit: string;
  align: string;
  stand_behind: number;
  status: boolean;
  show_desktop: number;
  hide_tablet_lg: number;
  hide_tablet: number;
  show_mobile: number;
}
