import {
  PencilOutlined,
  Table,
  TrashOutlined,
  mergeArrayObjectByKeyDependOnNewArray,
} from 'tera-dls';
import {
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import EditableCell from './EditableCell';
import _ from 'lodash';
import useTeraTable from '../useTeraTable';
import FormTera, { useFormTera } from '_common/dof/FormTera';
import { IRecordCreator } from '../_interfaces';
import { OPERATION_KEY, flatAction } from '../constants';

const TeraEditableRow = () => {
  const {
    data,
    columns = [],
    editable = {},
    recordCreatorProps = {},
    formObjectType,
    actionRef,
    ...restProps
  } = useTeraTable();
  const [forRef] = useFormTera();
  const updateFormValues = (data?) =>
    data ? forRef?.current?.reset(data) : forRef?.current?.reset();

  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [editingKey, setEditingKey] = useState<string | undefined>();
  const {
    onEditableKeyChange,
    editableKey,
    onValuesChange,
    actionRender,
    onUpdate,
    onAdd,
    onDelete,
    key = 'id',
  } = editable;

  const { position = 'top', record } = recordCreatorProps as IRecordCreator;

  useEffect(() => {
    setEditingKey(editableKey);
  }, [editableKey]);

  useEffect(() => {
    onEditableKeyChange && onEditableKeyChange(editingKey);
  }, [editingKey]);

  useEffect(() => {
    if (data) {
      const usedValue = data.filter((item) => !item.isDelete);
      setDataSource(usedValue);
      updateFormValues(usedValue);
    }
  }, [data]);

  const isEditing = (record): boolean =>
    record?.[key] && record[key] === editingKey;

  const handleAddNewData = (record): void => {
    const newRecord = { ...record };
    const newData = [...dataSource].map((data) =>
      data?.[key] === record?.[key] ? newRecord : data,
    );
    setEditingKey(undefined);
    setDataSource(newData);
    onAdd && onAdd(newRecord);
    onValuesChange && onValuesChange(newRecord, newData);
  };

  const handleUpdateData = (record): void => {
    const newData = _.cloneDeep(dataSource);
    const index = newData?.findIndex((item) => record?.[key] === item?.[key]);
    const newRecord = { ...record };
    if (index > -1) {
      newData.splice(index, 1, {
        ...newRecord,
      });
    }
    setEditingKey(undefined);
    setDataSource(newData);
    onUpdate && onUpdate(newRecord);
    onValuesChange && onValuesChange(newRecord, newData);
  };

  const handleSubmitForm = (value): void => {
    const { isNew, isUpdate } = value;

    const data = _.pickBy(value, (_, key) => !flatAction?.includes(key));
    if (isNew) {
      if (isNew && isUpdate) {
        handleUpdateData({ ...data, isNew: true });
        return;
      }
      if (isNew) {
        handleAddNewData({ ...data, isNew: true });
        return;
      }
    }
    if (isUpdate) {
      handleUpdateData({ ...data, isUpdate: true });
      return;
    }
  };

  const handleEdit = (record): void => {
    updateFormValues({ ...record, isUpdate: true });
    setEditingKey(record?.[key]);
  };

  const handleCancel = (): void => {
    const newDataSource = dataSource.filter((item) => !item.isRemove);
    setDataSource(newDataSource);
    updateFormValues();
    setEditingKey(undefined);
  };

  const handleDelete = (targetKey: string | number): void => {
    const record = dataSource.find(
      (item) => String(item?.[key]) === String(targetKey),
    );

    const newDataSource = dataSource.map((item) =>
      String(item?.[key]) === String(targetKey)
        ? { ...item, isDelete: true }
        : item,
    );
    setDataSource(newDataSource);
    updateFormValues();
    onDelete && onDelete({ ...record, isDelete: true });
    onValuesChange &&
      onValuesChange({ ...record, isDelete: true }, newDataSource);
  };

  const handleAdd = useCallback(() => {
    setEditingKey((prev) => {
      const newRecord = record(dataSource?.length) ?? {};
      if (prev) return prev;
      if (!newRecord?.[key]) return undefined;
      if (position === 'top') {
        setDataSource((prev: Array<any>) => {
          return [{ ...newRecord, isNew: true, isRemove: true }, ...prev];
        });
      }
      if (position === 'bottom') {
        setDataSource((prev: Array<any>) => {
          return [...prev, { ...newRecord, isNew: true, isRemove: true }];
        });
      }

      updateFormValues({ ...newRecord, isNew: true, isRemove: true });
      return newRecord?.[key];
    });
  }, [setEditingKey, setDataSource, dataSource]);

  useImperativeHandle(
    actionRef,
    () => {
      return {
        editRow: handleEdit,
        cancelRow: handleCancel,
        saveRow: forRef?.current?.submit,
        addRow: handleAdd,
        deleteRow: handleDelete,
      };
    },
    [handleAdd, handleEdit, handleCancel, handleDelete, forRef],
  );

  const defaultAction = (record): ReactNode => {
    const editable = isEditing(record);
    return editable ? (
      <div className="flex gap-3 justify-center">
        <a
          className="text-[#1890ff] cursor-pointer"
          onClick={() => forRef?.current?.submit()}
        >
          Save
        </a>
        <a className="text-[#1890ff] cursor-pointer" onClick={handleCancel}>
          Cancel
        </a>
      </div>
    ) : (
      <div className="flex gap-5 justify-center">
        <a
          className={` ${
            !!editingKey
              ? 'text-[#00000040] cursor-not-allowed'
              : 'text-blue-600 cursor-pointer'
          }`}
          onClick={() => !editingKey && handleEdit(record)}
        >
          <PencilOutlined
            onClick={() => actionRef?.current?.editRow(record)}
            className={` ${
              !!editingKey
                ? 'text-[#00000040] cursor-not-allowed'
                : 'text-blue-600 cursor-pointer'
            }`}
            width={'1rem'}
            height={'1rem'}
          />
        </a>
        <a
          className={` ${
            !!editingKey
              ? 'text-[#00000040] cursor-not-allowed'
              : 'text-red-600 cursor-pointer'
          }`}
          onClick={() => !editingKey && handleDelete(record[key])}
        >
          <TrashOutlined
            onClick={() => actionRef?.current?.deleteRow(record?.key)}
            className={` ${
              !!editingKey
                ? 'text-[#00000040] cursor-not-allowed'
                : 'text-red-600 cursor-pointer'
            }`}
            width={'1rem'}
            height={'1rem'}
          />
        </a>
      </div>
    );
  };

  const defaultOperation: any = {
    title: '',
    key: OPERATION_KEY,
    dataIndex: OPERATION_KEY,
    width: 80,
    unit: 'px',
    align: 'center',
    render: (_, record) => {
      const defaultDom = defaultAction(record);
      if (actionRender) {
        return actionRender(record, defaultDom);
      }
      return defaultDom;
    },
  };

  const mapOperation = useMemo(() => {
    const newColumns = _.cloneDeep(columns);
    const data = mergeArrayObjectByKeyDependOnNewArray(
      [defaultOperation],
      newColumns,
      'dataIndex',
    );
    return data;
  }, [columns, defaultOperation]);

  const mergedColumns: any = mapOperation?.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        inputType: col.type ?? 'varchar',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        inputProps: col.inputProps ?? {},
        rules: col.rules,
      }),
    };
  });
  const formConfig = {
    ...(formObjectType && { object_type: formObjectType }),
  };
  return (
    <>
      <FormTera {...formConfig} ref={forRef} onSubmit={handleSubmitForm}>
        <Table
          {...restProps}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          data={dataSource}
        />
      </FormTera>
    </>
  );
};

export default TeraEditableRow;
