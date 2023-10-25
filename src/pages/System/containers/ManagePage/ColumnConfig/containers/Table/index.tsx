import { useMutation, useQuery } from '@tanstack/react-query';
import PaginationCustom from '_common/component/PaginationCustom';
import ActionCUD from '_common/component/TableColumnCustom/ActionCUD';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import useConfirm from '_common/hooks/useConfirm';
import { usePermission } from '_common/hooks/usePermission';
import { IPagination } from '_common/interface';
import { mergeField } from '_common/utils';
import { useEffect, useState } from 'react';
import {
  PaginationProps,
  PlusCircleOutlined,
  Table,
  TableProps,
  Tag,
  Tooltip,
  notification,
  useDetectDevice,
} from 'tera-dls';
import { dataType, statusOnOffString } from '../../../constants';
import ColumnConfigApi from '../../_api';
import { IParams } from '../../interfaces';
import ColumnConfigDetail from '../Detail';
import ColumnConfigForm from '../Form';

interface TableColumConfigProps {
  tableId: number | string;
  params?: IParams;
  tableProps?: TableProps;
  isAdd?: boolean;
}

function TableColumConfig({
  isAdd = false,
  tableProps = {},
  tableId,
  params,
}: TableColumConfigProps) {
  const confirm = useConfirm();
  const { hasPage } = usePermission();
  const { isMobile } = useDetectDevice();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [idColumn, setIdColumn] = useState<number | string>(null);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 10,
  });

  const {
    data: listColumn,
    isLoading,
    refetch,
  } = useQuery(
    ['get-list-column-config', tableId, params],
    () => {
      const data = mergeField(params, pagination, { table_id: tableId });
      return ColumnConfigApi.getList(data);
    },
    {
      cacheTime: 300000,
      staleTime: 300000,
    },
  );

  const { mutate: deleteColumn } = useMutation(
    (id: number) => ColumnConfigApi.delete(id),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          refetch();
        }
      },
      onError(error: any) {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  const handleDelete = (id: number, name: string) => {
    confirm.warning({
      title: 'XÁC NHẬN XÓA CỘT DỮ LIỆU',
      content: (
        <>
          <p>Bạn có chắc chắn muốn xóa cột</p>
          <p>{name} này không?</p>
        </>
      ),
      onOk: () => {
        deleteColumn(id);
      },
    });
  };

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setPagination({
      ...pagination,
      page: page,
      limit: pageSize,
    });
  };

  const handleDetail = (id: number) => {
    setIsOpenDetail(true);
    setIdColumn(id);
  };

  const handleUpdate = (id: number) => {
    setIsOpenForm(true);
    setIdColumn(id);
  };

  const buttonKey = {
    create: BUTTON_KEY.COLUMN_CONFIG_LIST_CREATE,
    update: BUTTON_KEY.COLUMN_CONFIG_LIST_UPDATE,
    detail: BUTTON_KEY.COLUMN_CONFIG_LIST_DETAIL,
    delete: BUTTON_KEY.COLUMN_CONFIG_LIST_DELETE,
  };

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'order',
      width: 60,
      align: 'center',
    },
    {
      title: 'Mã cột dữ liệu',
      dataIndex: 'concatenated_code',
      width: 200,

      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 200,
      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: 'Loại dữ liệu',
      dataIndex: 'type',
      width: 200,
      render: (type) => dataType[type],
    },
    {
      title: 'Key dữ liệu',
      dataIndex: 'key',
      width: 200,
      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: 'className',
      dataIndex: 'class_name',
      width: 200,
      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      width: 100,
      render: (text) => (
        <Tag color={statusOnOffString[text]?.color}>
          {statusOnOffString[text]?.name}
        </Tag>
      ),
    },
    {
      title: isAdd && hasPage(buttonKey.create) && (
        <Tooltip title="Thêm mới">
          <div className="flex justify-center">
            <PlusCircleOutlined
              className="w-6 h-6 text-green-500 cursor-pointer"
              onClick={() => setIsOpenForm(true)}
            />
          </div>
        </Tooltip>
      ),
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        return (
          <ActionCUD
            buttonKey={buttonKey}
            onClickDetail={() => handleDetail(record?.id)}
            onClickUpdate={() => handleUpdate(record?.id)}
            onClickDelete={() => handleDelete(record?.id, record?.title)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setPagination({ ...pagination, page: 1 });
  }, [params?.keyword]);

  return (
    <>
      <div className="bg-white shadow-xsm rounded-2xl overflow-hidden">
        <Table
          columns={columns}
          data={listColumn?.data || []}
          rowKey="id"
          loading={isLoading}
          hiddenColumns={isMobile && ['status', 'key', 'type', 'class_name']}
          {...tableProps}
        />
        {listColumn?.total > 0 && (
          <PaginationCustom
            onChange={handleChangePage}
            total={listColumn?.total || 0}
            current={listColumn?.current_page || 1}
            to={listColumn?.to}
            pageSize={listColumn?.per_page}
            from={listColumn?.from}
          />
        )}
      </div>
      {isOpenDetail && idColumn && (
        <ColumnConfigDetail
          open={isOpenDetail}
          onClose={() => {
            setIdColumn(null);
            setIsOpenDetail(false);
          }}
          id={idColumn}
        />
      )}
      {isOpenForm && (
        <ColumnConfigForm
          open={isOpenForm}
          id={idColumn}
          onClose={() => {
            setIsOpenForm(false);
            setIdColumn(null);
          }}
          onRefetch={refetch}
          tableId={tableId}
        />
      )}
    </>
  );
}

export default TableColumConfig;
