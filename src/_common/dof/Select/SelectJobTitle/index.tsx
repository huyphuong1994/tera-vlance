import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '_common/hooks/useDebounce';
import { forwardRef, useState } from 'react';
import { OptionProps, SelectProps } from 'tera-dls';
import SelectEntity from '../SelectEntity';
import { HrmApi } from '../../_api';
import { TParamsApiDof } from '_common/dof/interfaces';

interface SelectJobTitleProps extends SelectProps {
  placeholder?: string;
  paramsApi?: TParamsApiDof;
}

const SelectJobTitle = forwardRef(
  (
    { placeholder = 'Vui lòng chọn', paramsApi, ...props }: SelectJobTitleProps,
    ref,
  ) => {
    const [searchJobTitle, setSearchJobTitle] = useState('');
    const searchJobTitleDebounce = useDebounce(searchJobTitle, 300);
    const paramsQuery = {
      limit: 10,
      page: 1,
      name: searchJobTitleDebounce,
      ...paramsApi,
    };
    const { data: listJobTitle } = useQuery(
      ['get-job-title', paramsApi],
      () => HrmApi.getListJobTitle(paramsQuery),
      {
        staleTime: 300000,
        cacheTime: 300000,
      },
    );

    const optionsJobTitle: OptionProps[] =
      listJobTitle?.data?.map((job) => ({
        label: job?.name,
        value: job?.id,
      })) ?? [];

    return (
      <SelectEntity
        allowClear
        showSearch
        labelInValue
        onSearch={setSearchJobTitle}
        placeholder={placeholder}
        options={optionsJobTitle}
        {...props}
        ref={ref}
      />
    );
  },
);

export default SelectJobTitle;
