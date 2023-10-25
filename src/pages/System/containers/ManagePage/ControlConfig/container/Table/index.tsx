import { useMutation, useQuery } from '@tanstack/react-query';
import PaginationCustom from '_common/component/PaginationCustom';
import ActionCUD from '_common/component/TableColumnCustom/ActionCUD';
import { messageError } from '_common/constants/message';
import useConfirm from '_common/hooks/useConfirm';
import { IPagination } from '_common/interface';
import { statusConfigColor } from 'pages/System/constants';
import { useState } from 'react';
import {
  ColumnsType,
  PaginationProps,
  PlusCircleOutlined,
  Table,
  TableProps,
  Tag,
  Tooltip,
  notification,
} from 'tera-dls';
import ControlConfigApi from '../../_api';
import DetailControlConfig from '../Detail';
import FormControlConfig from '../Form';
import { ResponseGetApi } from '_common/interface/api';
import { GroupControl, ResponseDetailControl } from '../../interfaces';
interface TableControlConfigProps {
  keyword?: string;
  pageId: number;
  isAdd?: boolean;
  tableProps?: TableProps;
}
const TableControlConfig = ({
  isAdd = false,
  tableProps,
  pageId,
  keyword,
}: TableControlConfigProps) => {
  const confirm = useConfirm();
  const [openDetail, setOpenDetail] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [controlId, setControlId] = useState(null);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 10,
  });
  const { data, refetch, isFetching } = useQuery<
    ResponseGetApi<ResponseDetailControl[]>
  >(['get-list-control-config', pagination, pageId, keyword], () =>
    ControlConfigApi.getList({ ...pagination, page_id: pageId, keyword }),
  );

  const { mutate: mutateDelete } = useMutation(
    (id: number) => ControlConfigApi.delete(id),
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          refetch();
          notification.success({
            message: res?.msg,
          });
        }
      },
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  const handleDelete = (id: number, title: string) => {
    confirm.warning({
      title: 'Xác nhận xoá control',
      content: (
        <>
          <p>Bạn có chắc chắn muốn xóa cấu hình</p>
          <p>
            <span className="font-bold">{title}</span> này không?
          </p>
        </>
      ),
      onOk: () => {
        mutateDelete(id);
      },
    });
  };

  const handleOpenDetail = (id: number) => {
    setOpenDetail(true);
    setControlId(id);
  };

  const handleOpenForm = (id: number) => {
    if (id) {
      setControlId(id);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setControlId(null);
  };
  const columns: ColumnsType<ResponseDetailControl> = [
    {
      title: 'STT',
      dataIndex: 'record_number',
    },
    {
      title: 'Mã control',
      dataIndex: 'code',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
    },
    {
      title: 'Nhóm control',
      dataIndex: 'group_control',
      render: (group_control: GroupControl) => group_control?.title,
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
    },
    {
      title: 'className',
      dataIndex: 'class_name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string, record) => (
        <Tag className="w-fit" color={statusConfigColor[status]}>
          {record?.status_text}
        </Tag>
      ),
    },
    {
      title: isAdd && (
        <div className="flex justify-center">
          <Tooltip title="Thêm mới">
            <div>
              <PlusCircleOutlined
                className="w-6 h-6 text-green-500 cursor-pointer"
                onClick={() => setOpenForm(true)}
              />
            </div>
          </Tooltip>
        </div>
      ),
      render: (record: ResponseDetailControl) => {
        return (
          <ActionCUD
            onClickDetail={() => handleOpenDetail(record.id)}
            onClickDelete={() => handleDelete(record.id, record.title)}
            onClickUpdate={() => handleOpenForm(record.id)}
          />
        );
      },
    },
  ];

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setPagination({
      page: page,
      limit: pageSize,
    });
  };

  return (
    <>
      <div className="overflow-hidden bg-white shadow-xsm rounded-2xl">
        <Table
          columns={columns}
          data={data?.data}
          loading={isFetching}
          scroll={{ x: 1500 }}
          className="rounded-sm"
          {...tableProps}
        />
        {data?.total > 0 && (
          <PaginationCustom
            onChange={handleChangePage}
            total={data?.total || 0}
            current={data?.current_page}
            pageSize={data?.per_page}
            to={data?.to}
            from={data?.from}
          />
        )}
      </div>
      {openDetail && (
        <DetailControlConfig
          id={controlId}
          open={openDetail}
          onCloseModal={() => setOpenDetail(false)}
        />
      )}
      {openForm && (
        <FormControlConfig
          controlId={controlId}
          pageId={pageId}
          onClose={handleCloseForm}
          open={openForm}
        />
      )}
    </>
  );
};

export default TableControlConfig;
