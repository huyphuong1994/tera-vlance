import { makeAutoObservable } from 'mobx';
import { IDrawerStore } from './interface';

export class DrawerStore {
  open = false;
  object_type = null;
  object_id = null;

  constructor() {
    makeAutoObservable(this);
  }

  setDrawer = (value: IDrawerStore) => {
    this.open = value.open;
    this.object_type = value.object_type;
    this.object_id = value.object_id;
  };
}
