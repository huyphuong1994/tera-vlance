import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '_common/hooks/useDebounce';
import { forwardRef, useMemo, useState } from 'react';
import { OptionProps } from 'tera-dls';
import { SelectProps } from 'tera-dls/lib/components/Select';
import SelectEntity from '../SelectEntity';
import { HrmApi } from '../../_api';
import { TParamsApiDof } from '_common/dof/interfaces';

interface SelectEmployeeProps extends SelectProps {
  paramsApi?: TParamsApiDof;
}

const SelectEmployee = forwardRef<HTMLInputElement, SelectEmployeeProps>(
  (
    { selectedValue, placeholder = 'Vui lòng chọn', paramsApi, mode, ...props },
    ref,
  ) => {
    const [searchEmployee, setSearchEmployee] = useState<string>('');
    const searchEmployeeDebounce = useDebounce(searchEmployee, 300);

    const { data: listEmployee } = useQuery(
      ['get-employee', searchEmployeeDebounce],
      () =>
        HrmApi.getListEmployee({
          params: {
            page: 1,
            limit: 10,
            full_name: searchEmployeeDebounce,
            ...paramsApi,
          },
        }),
      {
        staleTime: 300000,
        cacheTime: 300000,
      },
    );

    const optionsEmployee: OptionProps[] = useMemo(() => {
      const options = listEmployee?.data?.data?.map((employee) => ({
        label:
          mode === 'multiple'
            ? employee?.full_name
            : `${employee?.code} - ${employee?.full_name}`,
        value: employee?.id,
      }));
      return options;
    }, [listEmployee, mode]);

    return (
      <SelectEntity
        ref={ref}
        allowClear
        showSearch
        labelInValue
        placeholder={placeholder}
        options={optionsEmployee}
        searchValue={searchEmployee}
        selectedValue={selectedValue}
        onSearch={setSearchEmployee}
        mode={mode}
        {...props}
      />
    );
  },
);

export default SelectEmployee;
