export interface IFormManeuverItem {
  project_id: number;
  equipment_id: any[];
  file_upload: IItemFileUpload;
  determine_number: string;
  started_at: string;
  assigned_at: string;
  note: string;
}

export interface IItemFileUpload {
  id?: number;
  name?: string;
  url?: string;
}
