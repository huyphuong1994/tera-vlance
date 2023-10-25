import { useQuery } from '@tanstack/react-query';
import PageTableColumnAPI from '_common/component/ColumnSetting/_api';
import { useStores } from '_common/hooks';
import { toJS } from 'mobx';
import ConfigurationTable from '../ConfigurationTable';
import NormalTable from '../NormalTable';
import { IColumnType } from '_common/component/ColumnSetting/ColumnSettingOverview';

interface IProps {
  columns?: Array<IColumnType>;
  objectType: string;
  [key: string]: any;
}

const TableEntity = (props: IProps) => {
  const { objectType, columns: defaultColumns = [], ...restProps } = props;
  const {
    columnSettingStore: { columns, addColumnByObjectId },
  } = useStores();

  useQuery(
    ['page-table-column', objectType],
    () => PageTableColumnAPI.getList({ params: { object_type: objectType } }),
    {
      onSuccess: (data) => {
        addColumnByObjectId(data, objectType);
      },
      enabled: !!objectType,
      staleTime: 300000,
      cacheTime: 300000,
    },
  );
  const configurationColumns = toJS(columns?.[objectType]);

  return configurationColumns?.length > 0 ? (
    <ConfigurationTable
      {...restProps}
      objectType={objectType}
      defaultColumns={defaultColumns}
      configurationColumns={configurationColumns}
    />
  ) : (
    <NormalTable {...restProps} defaultColumns={defaultColumns} />
  );
};

export default TableEntity;
