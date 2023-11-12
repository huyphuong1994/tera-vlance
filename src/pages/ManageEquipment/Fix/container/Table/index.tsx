import { notification, PaginationProps, Table } from 'tera-dls';
import ActionCUD from '../../../../../_common/component/TableColumnCustom/ActionCUD';
import { BUTTON_KEY } from '../../../../../_common/constants/permission';
import { useMutation, useQuery } from '@tanstack/react-query';
import { filterField, formatNumber } from '../../../../../_common/utils';
import { messageError } from '../../../../../_common/constants/message';
import React, { useEffect, useState } from 'react';
import { updateURLQuery } from '../../../../System/containers/ManagePage/TableConfig/container/Table';
import { useNavigate } from 'react-router-dom';
import PaginationCustom from '../../../../../_common/component/PaginationCustom';
import useConfirm from '../../../../../_common/hooks/useConfirm';
import { EQUIPMENT_PAGE_URL } from '../../../../../_common/constants/url';
import FixForm from '../Form';
import FixPageApi from '../../_api';
import moment from 'moment/moment';

interface IParams {
  page: number;
  limit: number;
}

interface ITableCategoryProps {
  keyword: string;
}

const TableFix = (props: ITableCategoryProps) => {
  const { keyword } = props;
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
    ['get-table-fix-list', params],
    () => {
      return FixPageApi.getFixList({
        params: filterField({ ...params, keyword }),
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

  console.log(data);

  const { mutate: deleteColumn } = useMutation(
    (id: number | string) => FixPageApi.deleteFix(id),
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
      title: 'STT',
      dataIndex: 'record_number',
      width: 80,
      fixed: 'center',
      render: (_, record, index) => {
        return <span>{index + (params.page - 1) * params.limit + 1}</span>;
      },
    },
    {
      title: 'Tên sửa chữa',
      dataIndex: 'code',
      width: 350,
      align: 'left',
      render: (_, record) => {
        return (
          <div>
            <div className="flex items-center">
              <div className="ml-2">
                <ul>
                  <li>
                    <span className="text-green-400 text-xxs font-semibold">
                      {record?.machine?.code}
                    </span>
                    <span className="text-xxs"> - {record?.machine?.name}</span>
                  </li>
                  <li>
                    <div className="text-xxs mt-2">
                      <span className="text-gray-800 font-semibold">
                        Dự án{' '}
                      </span>
                      <span>- {record?.project?.name}</span>
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
      title: 'Nội dung',
      dataIndex: 'content',
      width: 180,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'fixed_at',
      width: 180,
      render: (text) => {
        return (
          <span className="text-xxs">
            {text
              ? moment(text, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
              : ''}
          </span>
        );
      },
    },
    {
      title: 'Đơn vị',
      dataIndex: 'units',
      width: 180,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 180,
      render: (text) => {
        return <span className="text-xxs">{formatNumber(text)}</span>;
      },
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      width: 180,
      render: (text) => <span className="text-xxs">{formatNumber(text)}</span>,
    },
    {
      title: 'VAT(%)',
      dataIndex: 'vat',
      width: 100,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: 'Thành tiền(đ)',
      dataIndex: 'sum_total',
      width: 200,
      render: (text) => <span className="text-xxs">{formatNumber(text)}</span>,
    },
    {
      title: '',
      dataIndex: 'action',
      width: 120,
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
    refetch();
  }, [params.limit, params.page, status, keyword]);

  return (
    <>
      <Table
        columns={columns}
        data={data?.data || []}
        rowKey={(record: any) => record?.id}
        // loading={isLoading}
      />
      {data?.total > 0 && (
        <PaginationCustom
          onChange={handleChangePage}
          total={data?.total || 0}
          current={data?.current_page || 1}
          pageSize={data?.per_page}
          to={data?.data?.to}
          from={data?.data?.from}
        />
      )}
      {isOpenForm && (
        <FixForm
          onRefetch={refetch}
          id={idColumn}
          open={isOpenForm}
          onClose={() => setIsOpenForm(false)}
        />
      )}
    </>
  );
};

export default TableFix;
