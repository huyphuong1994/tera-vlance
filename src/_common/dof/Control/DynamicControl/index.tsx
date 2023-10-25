import React from 'react';
import Input from '../Input';
import InputNumber from '../InputNumber';
import TextArea from '../TextArea';

interface DynamicControlProp {
  type?: 'varchar' | 'int' | 'text';
}

const DynamicControl = React.memo(({ type, ...props }: DynamicControlProp) => {
  switch (type) {
    case 'varchar':
      return <Input {...props} />;
    case 'int':
      return <InputNumber {...props} />;
    case 'text':
      return <TextArea {...props} />;

    default:
      return <Input {...props} />;
  }
});

export default DynamicControl;
