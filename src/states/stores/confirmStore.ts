import { makeAutoObservable } from 'mobx';
import { IConfirmStore } from './interface';

export class ConfirmStore {
  openConfirm = false;
  onOk = null;
  onCancel = null;
  content = null;
  type = null;
  align = 'center';
  props = {} as any;

  constructor() {
    makeAutoObservable(this);
  }

  setOpenConfirm = (value: IConfirmStore) => {
    this.openConfirm = true;
    this.onOk = value?.onOk || null;
    this.onCancel = value?.onCancel || null;
    this.content = value?.content || null;
    this.type = value?.type || null;
    this.align = value?.align || 'center';
    this.props = value?.props || {};
  };

  setCloseConfirm = () => {
    this.openConfirm = false;
    this.onOk = null;
    this.onCancel = null;
    this.content = null;
    this.type = null;
    this.align = 'center';
    this.props = {};
  };
}
