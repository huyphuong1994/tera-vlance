export interface IFormModel {
  open: boolean;
  id?: number;
}

export interface RequestImport {
  page_id?: number;
  form_id?: number;
  file: string;
  overwrite: boolean;
}
