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
