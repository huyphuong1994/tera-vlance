import React from 'react';
import { InputNumberProps, InputNumber as InputNumberTera } from 'tera-dls';
import { Controller } from 'react-hook-form';
import { useTeraForm } from '_common/dof/FormTera/TeraFormContext';
import { useTeraFormItem } from '_common/dof/FormTera/TeraItemContext';
import classNames from 'classnames';

const InputNumber = React.memo(({ ...props }: InputNumberProps) => {
  const { form } = useTeraForm();
  const { item, config, rules } = useTeraFormItem();
  const { control } = form;

  return (
    <Controller
      control={control}
      defaultValue={null}
      {...item}
      rules={rules}
      render={({ field }) => (
        <InputNumberTera
          data-object_type={item?.object_type}
          data-object_id={item?.object_id}
          placeholder="Vui lòng nhập"
          {...field}
          {...props}
          {...config?.field}
          className={classNames('w-full', {
            [props?.className]: true,
            [config?.class_name]: true,
          })}
        />
      )}
    />
  );
});

export default InputNumber;
