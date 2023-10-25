import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class AuthStore {
  token = '';

  access_id = '';

  user = null;

  device = '';

  role = 'user';

  permissions = [];

  modules = [];

  epics = [];

  general = {};

  user_info = {};

  logo = '';

  auth_url = '';

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'AuthStore',
      properties: [
        'token',
        'access_id',
        'user',
        'permissions',
        'epics',
        'modules',
        'role',
        'device',
      ],
      storage: window.localStorage,
    });
  }

  get authenticated() {
    // TODO: This logic can be changed on demand
    return !!this.token;
  }

  clear = () => {
    this.token = '';
    this.user = null;
  };

  setInitData = (data: any) => {
    this.device = data?.device_code;
    const general = data?.general || [];
    this.user_info = data?.user_info || this.user_info;
    this.logo = data?.logo_url;
    this.auth_url = data?.auth_url;

    const newsValue: any = {};

    general.forEach((item: any) => {
      newsValue[item.name] = item.value;
      if (item.value === '0') {
        newsValue[item.name] = false;
      }
    });

    this.general = newsValue;
  };

  updateToken = (token: string) => {
    this.token = token || this.token;
  };

  updateModules = (modules: string[]) => {
    this.modules = modules || [];
  };

  updatePermissions = (permissions: string[]) => {
    this.permissions = permissions || [];
  };

  updateEpic = (epics: string[]) => {
    this.epics = epics || [];
  };

  updateUser = (user: any) => {
    this.user = user?.user;
    this.role = user?.user?.role || this.role;
    this.token = user?.token || this.token;
    this.access_id = user?.access_id || this.access_id;
  };
}
