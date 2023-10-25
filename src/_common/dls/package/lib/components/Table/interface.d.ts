import { CheckboxProps } from 'components/Checkbox/interface';
import { SpinProps } from 'lib';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import { ColumnType as RcColumnType } from 'rc-table/lib/interface';
import React, { Key } from 'react';
import { INTERNAL_SELECTION_ITEM } from './hooks/useSelection';
export type RowSelectionType = 'checkbox' | 'radio' | string;
export type RowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple';
export type SelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void;
export interface SelectionItem {
    key: string;
    text: React.ReactNode;
    onSelect?: SelectionItemSelectFn;
}
export interface TableRowSelection<T> {
    /** Keep the selection keys in list even the key not exist in `dataSource` anymore */
    preserveSelectedRowKeys?: boolean;
    type?: RowSelectionType;
    selectedRowKeys?: Key[];
    defaultSelectedRowKeys?: Key[];
    onChange?: (selectedRowKeys: Key[], selectedRows: T[], info?: {
        type: RowSelectMethod;
    }) => void;
    getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
    selections?: INTERNAL_SELECTION_ITEM[];
}
export interface SorterResult<RecordType> {
    column?: ColumnType<RecordType>;
    order?: SortOrder;
    field?: Key | readonly Key[];
    columnKey?: Key;
}
export type SortOrder = 'descend' | 'ascend' | null;
export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;
export interface ColumnType<RecordType> extends Omit<RcColumnType<RecordType>, 'dataIndex'> {
    sorter?: CompareFn<RecordType> | boolean;
    dataIndex?: string;
    defaultSortOrder?: SortOrder;
    editable?: boolean;
}
export interface ColumnGroupType<RecordType> extends ColumnType<RecordType> {
    children: ColumnsType<RecordType>;
}
export type ColumnsType<RecordType = unknown> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];
export interface TableProps<RecordType = unknown> extends Omit<RcTableProps<RecordType>, 'columns'> {
    columns?: ColumnsType<RecordType>;
    width?: string;
    hiddenColumns?: Key[];
    rowSelection?: TableRowSelection<RecordType>;
    onChange?: (sorter: SorterResult<RecordType>) => void;
    loading?: boolean | SpinProps;
}
export type AnyObject = Record<PropertyKey, any>;
export type RefInternalTable = <RecordType extends AnyObject = AnyObject>(props: React.PropsWithChildren<TableProps<RecordType>> & {
    ref?: React.Ref<HTMLDivElement>;
}) => React.ReactElement;
