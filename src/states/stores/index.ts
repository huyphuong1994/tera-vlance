import { createContext } from 'react';
import { AuthStore } from './authStore';
import { IAuthStore } from './interface';
import { CommonStore } from './commonStore';
import { DrawerStore } from './drawerStore';
import { ConfirmStore } from './confirmStore';
import { ColumnSettingStore } from './columnSettingStore';

export class RootStore {
  authStore: IAuthStore;
  commonStore: CommonStore;
  drawerStore: DrawerStore;
  confirmStore: ConfirmStore;
  columnSettingStore: ColumnSettingStore;
  constructor() {
    this.authStore = new AuthStore();
    this.commonStore = new CommonStore();
    this.drawerStore = new DrawerStore();
    this.confirmStore = new ConfirmStore();
    this.columnSettingStore = new ColumnSettingStore();
  }
}
export const rootStore = new RootStore();
export const rootStoreContext = createContext(rootStore);
