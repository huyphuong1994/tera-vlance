import _ from 'lodash';
import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  DatePicker,
  Input,
  InputNumber,
  Select,
  TableProps,
  Form,
  Table,
} from 'tera-dls';
import { FormTeraItem } from '../FormTera';

const OPERATION_KEY = 'operation';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: any;
  record: any;
  index: number;
  children: React.ReactNode;
  control: any;
  register: any;
  inputProps: any;
}

const generateInputNode = ({ inputType, dataIndex, control, props }) => {
  let result;
  switch (inputType) {
    case 'text':
      result = (
        <FormTeraItem
          name={dataIndex}
          object_type="employee_group_create_code"
          label="Mã nhóm"
        >
          <Input {...props} />
        </FormTeraItem>
      );
      break;
    case 'number':
      result = <InputNumber {...props} />;
      break;
    case 'select':
      result = <Select {...props} />;
      break;
    case 'datetime':
      result = (
        <Controller
          name={dataIndex}
          control={control}
          render={({ field }) => (
            <DatePicker
              format={'DD/MM/YYYY HH:mm'}
              {...props}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      );
  }

  return result;
};
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  inputType,
  children,
  control,
  dataIndex,
  inputProps,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing
        ? generateInputNode({
            inputType,
            dataIndex,
            control,
            props: inputProps,
          })
        : children}
    </td>
  );
};

interface IEditable {
  editableKey?: string | undefined;
  onEditableKeyChange?: (val) => void;
  onValuesChange?: (record, recordList) => void;
  actionRender?: (row, defaultDom) => void;
  onUpdate?: (record) => void;
  onAdd?: (record) => void;
}

interface IRecordCreator {
  position?: 'top' | 'bottom';
  record: (index: number) => { [key: string]: any };
}

interface IProps extends TableProps {
  [key: string]: any;
  data: Array<any>;
  editable?: IEditable;
  recordCreatorProps?: IRecordCreator;
}

const EditableTable = forwardRef((props: IProps, ref) => {
  const {
    handleSubmit,
    reset: updateFormValues,
    control,
    register,
  } = useForm();
  const {
    data,
    columns = [],
    editable = {},
    recordCreatorProps,
    ...restProps
  } = props;

  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [editingKey, setEditingKey] = useState<string | undefined>();

  const {
    onEditableKeyChange,
    editableKey,
    onValuesChange,
    actionRender,
    onUpdate,
    onAdd,
  } = editable;

  const { position = 'top', record } = recordCreatorProps;

  useEffect(() => {
    editableKey && setEditingKey(editableKey);
  }, [editableKey]);

  useEffect(() => {
    if (data) {
      setDataSource(data);
      updateFormValues(data);
    }
  }, [data]);

  const isEditing = (record): boolean => record.key === editingKey;

  const handleAddNewData = (record): void => {
    const newData = [...dataSource, record];
    setDataSource(newData);
    onAdd && onAdd(record);
    onValuesChange && onValuesChange(record, newData);
  };

  const handleUpdateData = (record): void => {
    const newData = _.cloneDeep(dataSource);
    const index = newData?.findIndex((item) => record.key === item.key);
    if (index > -1) {
      newData.splice(index, 1, {
        ...record,
      });
    }
    setDataSource(newData);
    onUpdate && onUpdate(record);
    onValuesChange && onValuesChange(record, newData);
  };

  const handleSubmitForm = (value): void => {
    const { isNew, ...restValue } = value;
    if (isNew) {
      handleAddNewData(restValue);
    } else {
      handleUpdateData(value);
    }
    setEditingKey(undefined);
    onEditableKeyChange && onEditableKeyChange(undefined);
  };

  const handleEdit = (record): void => {
    updateFormValues(record);
    setEditingKey(record.key);
    onEditableKeyChange && onEditableKeyChange(record.key);
  };

  const handleCancel = (): void => {
    const newDataSource = dataSource.filter((item) => !item.isNew);
    setDataSource(newDataSource);
    updateFormValues(newDataSource);
    setEditingKey(undefined);
    onEditableKeyChange && onEditableKeyChange(undefined);
  };

  const handleAdd = useCallback(() => {
    setEditingKey((prev) => {
      let newRecord;
      if (prev) return prev;
      if (position === 'top') {
        newRecord = record(0);
        setDataSource((prev: Array<any>) => {
          return [{ ...newRecord, isNew: true }, ...prev];
        });
      }
      if (position === 'bottom') {
        newRecord = record(dataSource.length);
        setDataSource((prev: Array<any>) => {
          return [...prev, { ...newRecord, isNew: true }];
        });
      }
      updateFormValues(newRecord);
      onEditableKeyChange && onEditableKeyChange(newRecord.key);
      return newRecord.key;
    });
  }, [setEditingKey, setDataSource]);

  useImperativeHandle(
    ref,
    () => {
      return {
        editRow: handleEdit,
        cancelRow: handleCancel,
        saveRow: handleSubmit(handleSubmitForm),
        addRow: handleAdd,
      };
    },
    [handleAdd, handleEdit, handleCancel, handleSubmitForm],
  );

  const defaultAction = (record): ReactNode => {
    const editable = isEditing(record);
    return editable ? (
      <div className="flex gap-2">
        <a
          className="text-[#1890ff] cursor-pointer"
          onClick={handleSubmit(handleSubmitForm)}
        >
          Save
        </a>
        <a className="text-[#1890ff] cursor-pointer" onClick={handleCancel}>
          Cancel
        </a>
      </div>
    ) : (
      <a
        className={` ${
          !!editingKey
            ? 'text-[#00000040] cursor-not-allowed'
            : 'text-[#1890ff] cursor-pointer'
        }`}
        onClick={() => !editingKey && handleEdit(record)}
      >
        Edit
      </a>
    );
  };

  const defaultOperation = {
    title: OPERATION_KEY,
    key: OPERATION_KEY,
    dataIndex: OPERATION_KEY,
    render: (_, record) => {
      const defaultDom = defaultAction(record);
      if (actionRender) {
        return actionRender(record, defaultDom);
      }
      return defaultDom;
    },
  };

  const mapOperation = (columns) => {
    const newColumns = _.cloneDeep(columns);
    const index = newColumns.findIndex(
      (column) => column.dataIndex === OPERATION_KEY,
    );
    if (index === -1) {
      newColumns.push(defaultOperation);
    }
    return newColumns;
  };

  const mergedColumns = mapOperation(columns).map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        inputType: col.type ?? 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        inputProps: col.inputProps ?? {},
        control,
        register,
      }),
    };
  });

  return (
    <>
      <Form>
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
      </Form>
    </>
  );
});

export default EditableTable;
