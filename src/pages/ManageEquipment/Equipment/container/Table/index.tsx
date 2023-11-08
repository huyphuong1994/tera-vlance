import { notification, PaginationProps, Table, Tag } from 'tera-dls';
import { statusConfigColor, statusTextColor } from '../../constants';
import ActionCUD from '../../../../../_common/component/TableColumnCustom/ActionCUD';
import { BUTTON_KEY } from '../../../../../_common/constants/permission';
import { useMutation, useQuery } from '@tanstack/react-query';
import { filterField } from '../../../../../_common/utils';
import { messageError } from '../../../../../_common/constants/message';
import EquipmentPageApi from '../../_api';
import React, { useEffect, useState } from 'react';
import { updateURLQuery } from '../../../../System/containers/ManagePage/TableConfig/container/Table';
import { useNavigate } from 'react-router-dom';
import PaginationCustom from '../../../../../_common/component/PaginationCustom';
import EquipmentForm from '../Form';
import useConfirm from '../../../../../_common/hooks/useConfirm';
import { EQUIPMENT_PAGE_URL } from '../../../../../_common/constants/url';
import moment from 'moment';

interface IParams {
  page: number;
  limit: number;
}

interface ITableEquipmentProps {
  keyword: string;
  status: string;
  setSummary: (value: any) => void;
}

const TableEquipment = (props: ITableEquipmentProps) => {
  const { keyword, status, setSummary } = props;
  const navigate = useNavigate();
  const confirm = useConfirm();

  const [params, setParams] = useState<IParams>({ page: 1, limit: 10 });
  const [idColumn, setIdColumn] = useState<number | string>(null);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const buttonKey = {
    create: BUTTON_KEY.COLUMN_CONFIG_LIST_CREATE,
    update: BUTTON_KEY.COLUMN_CONFIG_LIST_UPDATE,
    detail: BUTTON_KEY.COLUMN_CONFIG_LIST_DETAIL,
    delete: BUTTON_KEY.COLUMN_CONFIG_LIST_DELETE,
  };

  const { data, refetch } = useQuery(
    ['get-table-equipment-list', params],
    () => {
      return EquipmentPageApi.getEquipmentList({
        params: filterField({ ...params, status, keyword }),
      });
    },
    {
      staleTime: 300000,
      cacheTime: 300000,
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  const { mutate: deleteColumn } = useMutation(
    (id: number | string) => EquipmentPageApi.deleteEquipment(id),
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

  const handleDetail = (id: number) => {
    setIsOpenForm(true);
    setIdColumn(id);
    navigate(`${EQUIPMENT_PAGE_URL.detail.path}/${id}`);
  };

  const handleUpdate = (id: number) => {
    setIsOpenForm(true);
    setIdColumn(id);
  };

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

  const columns: any = [
    {
      title: <div className="text-xxs">STT</div>,
      dataIndex: 'record_number',
      width: 80,
      fixed: 'center',
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: <div className="text-xxs">Thiết bị</div>,
      dataIndex: '',
      width: 350,
      align: 'left',
      render: (record) => {
        return (
          <div>
            <div className="flex items-center">
              <div className="ml-2">
                <ul>
                  <li>
                    <span className="text-green-400 text-xxs">
                      [{record?.code}]
                    </span>
                    <span className="text-xxs">{' ' + record?.name}</span>
                  </li>
                  <li>
                    <div className="text-xxs mt-2">
                      <span className="text-gray-400">Vị trí: </span>
                      <span>{record?.name}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: <div className="text-xxs">Thông số cơ bản</div>,
      dataIndex: '',
      width: 200,
      render: (_, record) => {
        return (
          <div>
            <ul className="text-xxs">
              <li className="mb-[5px]">
                <span className="text-gray-400 text-xxs">Nơi SX: </span>
                <span>{record?.made_in}</span>
              </li>
              <li className="mb-[5px]">
                <span className="text-gray-400 text-xxs">Năm SX: </span>
                <span>{record?.made_at}</span>
              </li>
              <li className="mb-[5px]">
                <span className="text-gray-400 text-xxs">Năm SD: </span>
                <span>{record?.used_at}</span>
              </li>
            </ul>
          </div>
        );
      },
    },
    {
      title: <div className="text-xxs">TG hoạt động</div>,
      dataIndex: 'start_date',
      width: 200,
      render: (_, record) => {
        return (
          <div>
            <ul className="text-xxs">
              <li className="mb-[5px]">
                <span className="text-gray-400 text-xxs">Chờ việc: </span>
                <span>
                  {record?.wait_work_at
                    ? moment(
                        record?.wait_work_at,
                        'YYYY-MM-DD HH:mm:ss',
                      ).format('DD/MM/YYYY')
                    : ''}
                </span>
              </li>
              <li className="mb-[5px]">
                <span className="text-gray-400 text-xxs">Trả máy: </span>
                <span>
                  {record?.return_expected_at
                    ? moment(
                        record?.return_expected_at,
                        'YYYY-MM-DD HH:mm:ss',
                      ).format('DD/MM/YYYY')
                    : ''}
                </span>
              </li>
            </ul>
          </div>
        );
      },
    },
    {
      title: <div className="text-xxs">Trạng thái</div>,
      dataIndex: 'status',
      width: 200,
      render: (status: string, record) => (
        <Tag className="w-fit text-xxs" color={statusConfigColor[status]}>
          <span className={statusTextColor[status] + 'text-xxs'}>
            {record?.status_text}
          </span>
        </Tag>
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <ActionCUD
              buttonKey={buttonKey}
              onClickDetail={() => handleDetail(record?.id)}
              onClickUpdate={() => handleUpdate(record?.id)}
              onClickDelete={() => handleDelete(record?.id, record?.name)}
            ></ActionCUD>
          </>
        );
      },
    },
  ];

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setParams({
      page: page,
      limit: pageSize,
    });
    updateURLQuery({
      location,
      navigate,
      params: { page: page, limit: pageSize },
    });
  };

  useEffect(() => {
    setSummary(data?.summary);
  }, [data?.summary]);

  useEffect(() => {
    refetch();
  }, [params.limit, params.page, status, keyword]);

  return (
    <>
      <Table
        columns={columns}
        data={data?.data?.data || []}
        rowKey={(record: any) => record?.id}
        // loading={isLoading}
      />
      {data?.data?.total > 0 && (
        <PaginationCustom
          onChange={handleChangePage}
          total={data?.data?.total || 0}
          current={data?.data?.current_page || 1}
          pageSize={data?.data?.per_page}
          to={data?.data?.to}
          from={data?.data?.from}
        />
      )}
      {isOpenForm && (
        <EquipmentForm
          onRefetch={refetch}
          id={idColumn}
          open={isOpenForm}
          onClose={() => setIsOpenForm(false)}
        />
      )}
    </>
  );
};

export default TableEquipment;
