export interface IFormModel {
  open: boolean;
  id?: number;
}

export interface IFormEquipmentFix {
  equipment_id: number;
  fixed_at: string;
  payment_at: string;
  user_follow: number;
  location: string;
  quantity: number;
  vat: number;
  units: string;
  price: number;
  content: string;
  machine?: any;
  sum_total: number;
}

export interface IFormEquipmentManeuver {
  equipment_id: number;
  fixed_at: string;
  payment_at: string;
  user_follow: number;
  location: string;
  quantity: number;
  vat: number;
  units: string;
  price: number;
  content: string;
}

export interface IFormRegistry {
  equipment_id: number;
  started_at: string;
  finished_at: string;
  address: string;
  note: string;
  file_upload: IFileUpload;
}

export interface IFormInsurance {
  equipment_id: number;
  started_at: string;
  finished_at: string;
  address: string;
  note: string;
  file_upload: IFileUpload;
}

export interface IFormRecord {
  equipment_id: number;
  status: number;
  note: string;
  file_upload: IFileUpload;
}

export interface IFileUpload {
  url?: string;
  name?: string;
  id?: number;
}
