import { makeAutoObservable } from 'mobx';

export class CommonStore {
  activeMenu = '';

  openMenuMore = false;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveMenu = (key: string) => {
    this.activeMenu = key;
  };

  setOpenMenuMore = (open: boolean) => {
    this.openMenuMore = open;
  };
}
