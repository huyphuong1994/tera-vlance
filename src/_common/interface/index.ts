export interface IFileUpload {
  name?: string;
  url?: string;
  id?: number;
}

export interface IPagination {
  page: number;
  limit: number;
}
export interface EmployeeCreated {
  code: string;
  full_name: string;
  gender_text: string;
  id: number;
  status_text: string;
  user_id: number;
}

export interface ImportFile {
  file: string;
  overwrite: boolean;
}
