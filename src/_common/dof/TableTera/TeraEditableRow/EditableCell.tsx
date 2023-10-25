import React from 'react';
import DynamicControl from '../../Control/DynamicControl';
import { FormTeraItem } from '../../FormTera';

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
  rules: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  inputType,
  children,
  dataIndex,
  inputProps,
  rules = [],
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <FormTeraItem
          name={dataIndex}
          isUpdate={editing}
          rules={rules}
          label=""
          displayLabel={false}
          style={{ margin: 0 }}
        >
          <DynamicControl type={inputType} {...inputProps} />
        </FormTeraItem>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
