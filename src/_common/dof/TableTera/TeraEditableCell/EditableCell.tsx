import React, { useEffect } from 'react';
import DynamicControl from '../../Control/DynamicControl';
import { FormTeraItem } from '../../FormTera';
import { useTeraForm } from '_common/dof/FormTera/TeraFormContext';

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
  key: string | number;
  forRef: any;
  onSave: () => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  inputType,
  children,
  dataIndex,
  inputProps,
  rules = [],
  record,
  ...restProps
}) => {
  const { form } = useTeraForm();
  const { setValue } = form;

  useEffect(() => {
    editing && setValue(dataIndex, record[dataIndex]);
  }, []);

  return (
    <td {...restProps}>
      {editing ? (
        <FormTeraItem
          name={dataIndex}
          isUpdate={true}
          rules={rules}
          label=""
          displayLabel={false}
          style={{ margin: 0 }}
        >
          <DynamicControl type={inputType} {...inputProps} placeholder="" />
        </FormTeraItem>
      ) : (
        children
      )}
    </td>
  );
};

export default React.memo(EditableCell);
