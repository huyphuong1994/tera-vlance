import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '_common/hooks/useDebounce';
import { forwardRef, useState } from 'react';
import { OptionProps, SelectProps } from 'tera-dls';
import SelectEntity from '../SelectEntity';
import { HrmApi } from '../../_api';
import { TParamsApiDof } from '_common/dof/interfaces';

interface SelectPositionProps extends SelectProps {
  placeholder?: string;
  paramsApi?: TParamsApiDof;
}

const SelectPosition = forwardRef(
  (
    { placeholder = 'Vui lòng chọn', paramsApi, ...props }: SelectPositionProps,
    ref,
  ) => {
    const [searchPosition, setSearchPosition] = useState('');
    const searchPositionDebounce = useDebounce(searchPosition, 300);
    const paramsQuery = {
      limit: 10,
      page: 1,
      name: searchPositionDebounce,
      ...paramsApi,
    };
    const { data: listPosition } = useQuery(
      ['get-position', paramsQuery],
      () => HrmApi.getListPosition(paramsQuery),
      {
        staleTime: 300000,
        cacheTime: 300000,
      },
    );

    const optionsPosition: OptionProps[] =
      listPosition?.data?.map((position) => ({
        label: position?.name,
        value: position?.id,
      })) ?? [];

    return (
      <SelectEntity
        allowClear
        showSearch
        labelInValue
        onSearch={setSearchPosition}
        placeholder={placeholder}
        options={optionsPosition}
        {...props}
        ref={ref}
      />
    );
  },
);

export default SelectPosition;
