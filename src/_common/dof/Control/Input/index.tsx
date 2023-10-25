import React from 'react';
import { InputProps, Input as InputTera } from 'tera-dls';
import { Controller } from 'react-hook-form';
import { useTeraForm } from '_common/dof/FormTera/TeraFormContext';
import { useTeraFormItem } from '_common/dof/FormTera/TeraItemContext';
import classNames from 'classnames';

const Input = React.memo(({ ...props }: InputProps) => {
  const { form } = useTeraForm();
  const { item, config, rules } = useTeraFormItem();
  const { control } = form;

  return (
    <Controller
      control={control}
      defaultValue=""
      {...item}
      rules={rules}
      render={({ field }) => (
        <InputTera
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

export default Input;
