import React from 'react';
import { ModalProps } from 'tera-dls';

export interface IAuthStore {
  device: string;
  authenticated: boolean;
  user: any;
  token: string;
  general: any;
  logo: string;
  auth_url: string;
  access_id: string;
  role: string;
  permissions: string[];
  modules: any[];
  epics: string[];
  user_info?: any;
  clear: () => void;
  setInitData: (data: any) => void;
  updateToken: (token: string) => void;
  updateUser: (user: any) => void;
  updatePermissions: (permissions: string[]) => void;
  updateModules: (modules: string[]) => void;
  updateEpic: (epics: string[]) => void;
}

export interface IRootStore {
  authStore: IAuthStore;
}

export interface IDrawerStore {
  open: boolean;
  object_type: string;
  object_id: string | number;
}

export interface IColumnSettingStore {
  open?: boolean;
  object_type: string;
}

export interface IConfirmStore extends ModalProps {
  onOk?: () => void;
  onCancel?: () => void;
  content: string | React.ReactNode;
  type?: 'success' | 'warning' | 'error';
  align?: 'center' | 'left' | 'right';
  [props: string]: any;
}
