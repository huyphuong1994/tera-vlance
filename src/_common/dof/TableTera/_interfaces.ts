import { ReactNode } from 'react';
import { TableProps } from 'tera-dls';

export interface IEditable {
  key?: string;
  editableKey?: string | undefined;
  onEditableKeyChange?: (val) => void;
  onValuesChange?: (record, recordList) => void;
  actionRender?: (row, defaultDom) => void;
  onUpdate?: (record) => void;
  onAdd?: (record) => void;
  onDelete?: (record) => void;
}

export interface IRecordCreator {
  position?: 'top' | 'bottom';
  record: (length: number) => { [key: string]: any };
}

export interface IPagination {
  onChange?: (page: number, pageSize: number) => void;
  page?: number;
  defaultPageSize?: number;
}

export interface ITeraTableProps extends TableProps {
  objectType?: string;
  objectId?: number;
  formObjectType?: string;
  formObjectId?: number;
  data: any;
  actionRef?: any;
  editable?: IEditable;
  recordCreatorProps?: IRecordCreator;
  mode?: 'editable-cell' | 'table' | 'editable-row';
  pagination?: IPagination;
  middleChildren?: ReactNode;
  [key: string]: any;
}
