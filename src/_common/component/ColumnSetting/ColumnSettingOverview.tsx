import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, PlusCircleOutlined, Tabs, notification } from 'tera-dls';
import PageTableColumnAPI from './_api';
import { messageError } from '_common/constants/message';
import { useStores } from '_common/hooks';
import ShowedColumn from './ShowedColumn';
import HiddenColumn from './HiddenColumn';

export interface IColumnType {
  [key: string]: any;
  id: number;
  order: number;
  show_desktop: boolean;
}

interface IProps {
  objectType: string;
}

interface IHiddenColumnVariable {
  id: number;
  status: string;
}

interface ISortColumn {
  id: number;
  order: number;
}

const ColumnSettingOverview = (props: IProps) => {
  const { objectType } = props;
  const [tab, setTab] = useState<string>('0');
  const {
    columnSettingStore: { columns: storeColumns, addColumnByObjectId },
  } = useStores();

  const [columns, setColumns] = useState<Array<IColumnType>>();

  useEffect(() => {
    setColumns(storeColumns?.[objectType]);
  }, []);

  const { refetch } = useQuery(
    ['page-table-column', objectType],
    () => PageTableColumnAPI.getList({ params: { object_type: objectType } }),
    {
      onSuccess: (data) => {
        setColumns(data);
        addColumnByObjectId(data, objectType);
      },
      enabled: !!objectType,
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  const { mutate: mutateHiddenColumn } = useMutation(
    (variable: IHiddenColumnVariable) =>
      PageTableColumnAPI.hideColumn({
        id: variable.id,
        params: { status: variable.status },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  const { mutate: mutateSortableColumn } = useMutation(
    (variable: Array<ISortColumn>) =>
      PageTableColumnAPI.sortColumn({
        params: { data: variable },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  const handleChangeTabs = (key: string): void => setTab(key);

  const handleSortColumn = (column: Array<IColumnType>): void => {
    const showedColumn = column.filter((item) => !!item.show_desktop);
    const data = showedColumn.map((item, index) => ({
      id: item.id,
      order: index + 1,
    }));
    mutateSortableColumn(data);
  };

  const handleHideColumn = (id: number): void => {
    setColumns((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, show_desktop: false } : item,
      ),
    );
    mutateHiddenColumn({ id, status: 'hide' });
  };

  const handleShowColumn = (id: number): void => {
    setColumns((prev) => {
      const newColumns = prev.map((item) =>
        item.id === id ? { ...item, show_desktop: true } : item,
      );
      const targetColumn = newColumns.find((item) => item.id == id);
      handleSortColumn([
        ...newColumns.filter((item) => item.id !== id),
        targetColumn,
      ]);
      return newColumns;
    });
    mutateHiddenColumn({ id, status: 'show' });
  };

  const showedColumnValue: Array<IColumnType> = columns?.filter(
    (item) => !!item.show_desktop,
  );

  const tabItems = [
    {
      key: '0',
      label: <p className="uppercase">Cột</p>,
    },
    {
      key: '1',
      label: <p className="uppercase">Cấu hình cột</p>,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-end">
        <Button className="rounded-[0.1875rem]">
          <div className="flex items-center gap-1 shrink-0">
            <PlusCircleOutlined className="w-5 h-5" />
            <span>Thêm mới</span>
          </div>
        </Button>
      </div>
      <div className="bg-white shadow-xsm rounded-2xl">
        <Tabs
          activeKey={tab}
          onChange={handleChangeTabs}
          id="page-table-column"
          items={tabItems}
        />
        {tab === '0' && (
          <div className="flex justify-between p-5 gap-x-5">
            <div className="flex-1">
              <HiddenColumn onShowColumn={handleShowColumn} value={columns} />
            </div>
            <div className="w-[1px] h-auto bg-[#E5E7EB]"></div>
            <div className="flex-1 flex flex-col gap-y-[0.9375rem]">
              <ShowedColumn
                value={showedColumnValue}
                onHideColumn={handleHideColumn}
                onSortColumn={handleSortColumn}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ColumnSettingOverview;
