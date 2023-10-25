import { useTeraForm } from '_common/dof/FormTera/TeraFormContext';
import { useTeraFormItem } from '_common/dof/FormTera/TeraItemContext';
import React from 'react';
import { RadioProps, Radio as RadioTera } from 'tera-dls';
import { Controller } from 'react-hook-form';

interface IProps extends RadioProps {
  children: any[];
}

const Radio = React.memo(({ children, ...props }: IProps) => {
  const { form } = useTeraForm();
  const { item, config, rules } = useTeraFormItem();
  const { control } = form;

  return (
    <Controller
      control={control}
      {...item}
      rules={rules}
      render={({ field }) => {
        return (
          <RadioTera.Group {...props} {...field} {...config?.field}>
            {children?.map((child) => (
              <RadioTera key={child?.key} value={child?.value}>
                {child?.label}
              </RadioTera>
            ))}
          </RadioTera.Group>
        );
      }}
    />
  );
});

export default Radio;
