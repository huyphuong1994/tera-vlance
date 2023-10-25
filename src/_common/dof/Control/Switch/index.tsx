import React from 'react';
import { Toggle as ToggleTera, ToggleProps } from 'tera-dls';
import { Controller } from 'react-hook-form';
import { useTeraForm } from '_common/dof/FormTera/TeraFormContext';
import { useTeraFormItem } from '_common/dof/FormTera/TeraItemContext';

const Toggle = React.memo(({ ...props }: ToggleProps) => {
  const { form } = useTeraForm();
  const { item } = useTeraFormItem();
  const { control } = form;

  return (
    <Controller
      control={control}
      {...item}
      render={({ field }) => <ToggleTera {...props} {...field} />}
    />
  );
});

export default Toggle;
