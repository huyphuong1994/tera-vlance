import React, { useMemo } from 'react';
import { SelectProps, Select as SelectTera } from 'tera-dls';
import { Controller } from 'react-hook-form';
import { useTeraForm } from '_common/dof/FormTera/TeraFormContext';
import { useTeraFormItem } from '_common/dof/FormTera/TeraItemContext';

const Select = React.memo(({ ...props }: SelectProps) => {
  const { form } = useTeraForm();
  const { item, config, rules } = useTeraFormItem();
  const { control } = form;

  const inputProps = useMemo(
    () => ({
      placeholder: config?.place_holder || props?.placeholder,
      className: config?.class_name || props?.className,
    }),
    [config],
  );

  return (
    <Controller
      control={control}
      defaultValue={null}
      {...item}
      rules={rules}
      render={({ field }) => (
        <SelectTera
          data-object_type={item?.object_type}
          data-object_id={item?.object_id}
          placeholder="Vui lòng chọn"
          className="w-full"
          {...field}
          {...props}
          {...inputProps}
        />
      )}
    />
  );
});

export default Select;
