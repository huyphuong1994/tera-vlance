import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '_common/hooks/useDebounce';
import { forwardRef, useState } from 'react';
import { OptionProps, SelectProps } from 'tera-dls';
import SelectEntity from '../SelectEntity';
import { HrmApi } from '../../_api';
import { TParamsApiDof } from '_common/dof/interfaces';

interface SelectDepartmentProps extends SelectProps {
  placeholder?: string;
  paramsApi?: TParamsApiDof;
}

const SelectDepartment = forwardRef<HTMLInputElement, SelectDepartmentProps>(
  ({ placeholder = 'Vui lòng chọn', paramsApi, ...props }, ref) => {
    const [searchDepartment, setSearchDepartment] = useState('');
    const searchDepartmentDebounce = useDebounce(searchDepartment, 300);
    const paramsQuery = {
      limit: 10,
      page: 1,
      name: searchDepartmentDebounce,
      ...paramsApi,
    };

    const { data: listDepartment } = useQuery(
      ['get-department', paramsQuery],
      () => HrmApi.getListDepartment(paramsQuery),
      {
        staleTime: 300000,
        cacheTime: 300000,
      },
    );

    const optionsDepartment: OptionProps[] =
      listDepartment?.data?.map((department) => ({
        label: department?.name,
        value: department?.id,
      })) ?? [];

    return (
      <SelectEntity
        allowClear
        showSearch
        labelInValue
        onSearch={setSearchDepartment}
        placeholder={placeholder}
        options={optionsDepartment}
        {...props}
        ref={ref}
      />
    );
  },
);

export default SelectDepartment;
