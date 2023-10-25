import {
  Pagination,
  PaginationProps,
  mergeArrayObjectByKey,
  useDetectDevice,
} from 'tera-dls';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import TeraTableContext from './TeraTableContext';
import { ITeraTableProps } from './_interfaces';
import { getHiddenColumnDataIndexes, mapDefaultIndexNumber } from './Util';
import _ from 'lodash';
import SystemTableConfigApi from 'pages/System/containers/ManagePage/TableConfig/_api';
import TeraEditableRow from './TeraEditableRow';
import TeraEditableCell from './TeraEditableCell';
import { INDEX_NUMBER_KEY } from './constants';
import TeraNormalTable from './TeraNormalTable';

const convertColumns = (columns) => {
  return columns.map((column) => {
    const { width, unit, ...restColumn } = column;
    return {
      ...restColumn,
      width,
      ...(width && unit && { width: `${width}${unit}` }),
    };
  });
};

const calculateDataSource = (page: number, pageSize: number, data: any): any =>
  data?.slice((page - 1) * pageSize, page * pageSize);

const TableTera = (props: ITeraTableProps) => {
  const {
    objectType,
    columns,
    mode = 'table',
    editable,
    pagination,
    data,
    middleChildren,
    ...restProps
  } = props;
  const { onChange, defaultPageSize = 10, page: propPage } = pagination ?? {};

  const { widthScreen } = useDetectDevice();

  const [params, setParams] = useState<any>({ page: 1, pageSize: 10 });
  const [dataSource, setDataSource] = useState([]);
  const total = data?.length;
  useEffect(() => {
    if (data && data?.length > 0) {
      const dataSource = calculateDataSource(
        params.page,
        params.pageSize,
        data,
      );
      setDataSource(dataSource);
      onChange && onChange(params.page, params.pageSize);
    }
  }, [params, data]);

  useEffect(() => {
    defaultPageSize &&
      setParams((prev) => ({
        ...(prev ?? {}),
        page: 1,
        pageSize: defaultPageSize,
      }));
  }, [defaultPageSize]);

  useEffect(() => {
    propPage && setParams((prev) => ({ ...(prev ?? {}), page: propPage }));
  }, [propPage]);

  const { data: response } = useQuery(
    ['page-table-column', objectType],
    () => SystemTableConfigApi.getConfig({ object_type: objectType }),
    {
      enabled: !!objectType,
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  useEffect(() => {
    mode &&
      editable?.onEditableKeyChange &&
      editable.onEditableKeyChange(undefined);
  }, [mode]);

  const defaultColumnConfig = response?.column_configs;

  const columnConfig = useMemo(() => {
    const newColumns = mergeArrayObjectByKey(
      _.cloneDeep(columns),
      defaultColumnConfig?.map((item) => ({ ...item, dataIndex: item.key })),
      'dataIndex',
    );
    return convertColumns(newColumns);
  }, [columns, defaultColumnConfig]);

  const hiddenColumnDataIndexes = useMemo(
    (): Array<string> => getHiddenColumnDataIndexes(widthScreen, columnConfig),
    [columnConfig, widthScreen],
  );

  const indexNumberObject = {
    title: 'STT',
    dataIndex: INDEX_NUMBER_KEY,
    render: (_, __, index) => (params?.page - 1) * params?.pageSize + index + 1,
  };

  const finalColumns = useMemo(
    () => mapDefaultIndexNumber(columnConfig, indexNumberObject),
    [columnConfig, params],
  );

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    const dataSource = calculateDataSource(page, pageSize, data);
    setDataSource(dataSource);
    setParams((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
    onChange && onChange(page, pageSize);
  };

  return (
    <TeraTableContext
      columns={finalColumns}
      hiddenColumns={hiddenColumnDataIndexes}
      editable={editable}
      data={dataSource}
      {...restProps}
    >
      {mode === 'editable-row' && <TeraEditableRow />}
      {mode == 'editable-cell' && <TeraEditableCell />}
      {mode == 'table' && <TeraNormalTable />}
      {middleChildren}
      {pagination && data?.length > 0 && (
        <div className="flex justify-end p-5 bg-white rounded-b-2xl">
          <Pagination
            onChange={handleChangePage}
            total={Number(total) ?? 0}
            current={params?.page}
            pageSize={defaultPageSize}
            defaultPageSize={defaultPageSize}
          />
        </div>
      )}
    </TeraTableContext>
  );
};
export default TableTera;
