import { Table } from 'tera-dls';
import { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import EditableCell from './EditableCell';
import useTeraTable from '../useTeraTable';
import EditableRow from './EditableRow';
import { flatAction } from '../constants';
import { getRowKey } from '../Util';
import _ from 'lodash';

const TeraEditableCell = () => {
  const {
    data,
    columns = [],
    editable = {},
    actionRef,
    rowKey,
    ...restProps
  } = useTeraTable();

  const [dataSource, setDataSource] = useState<Array<any>>([]);

  const { onValuesChange, onDelete } = editable;

  useEffect(() => {
    if (data) {
      const usedValue = data.filter((item) => !item.isDelete);
      setDataSource(usedValue);
    }
  }, [data]);

  const handleDelete = (targetKey: string | number): void => {
    const record = dataSource.find(
      (item) => String(getRowKey(rowKey, item)) === String(targetKey),
    );

    const flattenRecord = _.pickBy(
      record,
      (_, key) => !flatAction?.includes(key),
    );

    let newDataSource = [];
    if (record?.isNew) {
      newDataSource = dataSource.filter(
        (item) => String(getRowKey(rowKey, item)) === String(targetKey),
      );
    } else {
      newDataSource = dataSource.map((item) =>
        String(getRowKey(rowKey, item)) === String(targetKey)
          ? { ...flattenRecord, isDelete: true }
          : item,
      );
    }
    setDataSource(newDataSource);
    onDelete && onDelete({ ...flattenRecord, isDelete: true });
    onValuesChange &&
      onValuesChange({ ...flattenRecord, isDelete: true }, newDataSource);
  };

  useImperativeHandle(
    actionRef,
    () => {
      return {
        deleteRow: handleDelete,
      };
    },
    [handleDelete],
  );
  const handleUpdateData = useCallback(
    (recordKey, values) => {
      const stateRow = dataSource.find(
        (item) => String(getRowKey(rowKey, item)) === String(recordKey),
      );

      const removedFlat = _.pickBy(
        stateRow,
        (_, key) => !flatAction?.includes(key),
      );

      const newRow = {
        ...removedFlat,
        ...values,
        ...(stateRow?.isNew ? { isNew: true } : { isUpdate: true }),
      };
      const newDataSource = dataSource.map((item) => {
        const key = getRowKey(rowKey, item);
        if (String(key) === String(recordKey)) return newRow;
        return item;
      });

      setDataSource(newDataSource);
      onValuesChange(newRow, newDataSource);
    },
    [dataSource, rowKey],
  );

  const mergedColumns: any = columns?.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          inputType: col.type ?? 'varchar',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: col.editable,
          inputProps: col.inputProps ?? {},
          rules: col.rules,
          record,
          key: 1,
        };
      },
    };
  });
  return (
    <>
      <Table
        {...restProps}
        components={{
          body: {
            cell: EditableCell,
            row: (rowProps) => (
              <EditableRow {...rowProps} onUpdateData={handleUpdateData} />
            ),
          },
        }}
        columns={mergedColumns}
        data={dataSource}
      />
    </>
  );
};

export default TeraEditableCell;
