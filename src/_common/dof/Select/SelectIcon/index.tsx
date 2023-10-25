import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '_common/hooks/useDebounce';
import { TParamsApi } from '_common/interface/api';
import { forwardRef, useState } from 'react';
import { Icon } from 'tera-dls';
import { SelectProps } from 'tera-dls/lib/components/Select';
import SelectEntity from '../SelectEntity';
import { AdministratorApi } from '_common/dof/_api';

interface EmployeeShiftProps extends SelectProps {
  paramsApi?: TParamsApi;
}

const SelectIcon = forwardRef<HTMLInputElement, EmployeeShiftProps>(
  (props, ref) => {
    const { paramsApi, ...restProps } = props;
    const [searchIcon, setSearchIcon] = useState('');
    const searchIconDebounce = useDebounce(searchIcon, 300);

    const paramsQuery = {
      limit: 50,
      page: 1,
      keyword: searchIconDebounce,
      ...paramsApi,
    };
    const { data: icons } = useQuery(
      ['get-icon-list', paramsQuery],
      () => AdministratorApi.getListIcon(paramsQuery),
      {
        staleTime: 300000,
        cacheTime: 300000,
      },
    );
    const options = icons?.data?.map((item) => {
      return {
        label: item.name,
        value: item.key,
        labelDisplay: (
          <div className="flex">
            <Icon type={item.key} />
            <span className="ml-3">{item.name}</span>
          </div>
        ),
      };
    });

    return (
      <SelectEntity
        ref={ref}
        allowClear
        showSearch
        labelInValue
        options={options}
        onSearch={setSearchIcon}
        {...restProps}
      />
    );
  },
);

export default SelectIcon;
