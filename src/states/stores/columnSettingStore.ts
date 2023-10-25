import { makeAutoObservable } from 'mobx';
import { IColumnSettingStore } from './interface';
import { IColumnType } from '_common/component/ColumnSetting/ColumnSettingOverview';

export class ColumnSettingStore {
  open = false;
  object_type = null;
  columns = {};
  modalProps = {};

  constructor() {
    makeAutoObservable(this);
  }

  setColumnSetting = (value: IColumnSettingStore): void => {
    this.open = value.open;
    this.object_type = value.object_type;
  };

  openColumnSettingModal = (objectType: string): void => {
    this.open = true;
    this.object_type = objectType;
  };

  closeColumnSettingModal = (): void => {
    this.open = false;
    this.object_type = null;
  };

  addColumnByObjectId = (columns: IColumnType, objectType: string): void => {
    this.columns[objectType] = columns;
  };

  setModalProps = (props: { [key: string]: any } = {}): void => {
    this.modalProps = { ...this.modalProps, ...props };
  };
}
