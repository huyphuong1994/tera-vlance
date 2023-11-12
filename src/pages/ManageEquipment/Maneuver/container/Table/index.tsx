import { notification, PaginationProps, Table } from 'tera-dls';
import ActionCUD from '../../../../../_common/component/TableColumnCustom/ActionCUD';
import { BUTTON_KEY } from '../../../../../_common/constants/permission';
import { useMutation, useQuery } from '@tanstack/react-query';
import { filterField } from '../../../../../_common/utils';
import { messageError } from '../../../../../_common/constants/message';
import React, { useEffect, useState } from 'react';
import { updateURLQuery } from '../../../../System/containers/ManagePage/TableConfig/container/Table';
import { useNavigate } from 'react-router-dom';
import PaginationCustom from '../../../../../_common/component/PaginationCustom';
import useConfirm from '../../../../../_common/hooks/useConfirm';
import { EQUIPMENT_PAGE_URL } from '../../../../../_common/constants/url';
import ManeuverPageApi from '../../_api';
import FormManeuver from '../../../Common/Container/FormManeuver';
import moment from 'moment/moment';

interface IParams {
  page: number;
  limit: number;
}

interface ITableManeuverProps {
  keyword: string;
}

const TableManeuver = (props: ITableManeuverProps) => {
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
    ['get-table-maneuver-list', params],
    () => {
      return ManeuverPageApi.getEqpManeuverList({
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
    (id: number | string) => ManeuverPageApi.deleteManeuver(id),
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
      render: (_, record, index) => {
        return <span>{index + (params.page - 1) * params.limit + 1}</span>;
      },
    },
    {
      title: <div className="text-xxs">Thiết bị</div>,
      dataIndex: 'code',
      width: 250,
      align: 'left',
      render: (_, record) => {
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
                </ul>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: <div className="text-xxs">Số quyết định</div>,
      dataIndex: 'determine_number',
      width: 120,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: <div className="text-xxs">Dự án đang thực hiện</div>,
      dataIndex: 'total',
      width: 250,
      render: (_, record) => {
        return (
          <div>
            {record?.new_projects && record.new_projects.length
              ? record?.new_projects.map((project: any, key: number) => (
                  <span>{key <= 1 ? project.name + ', ' : ''}</span>
                ))
              : ''}
            {record?.new_projects && record?.new_projects.length > 2 ? (
              <span className="text-blue-600">
                ... + {record?.new_projects.length - 2}
              </span>
            ) : (
              ''
            )}
          </div>
        );
      },
    },
    {
      title: <div className="text-xxs">Ngày chuyển đi</div>,
      dataIndex: '',
      width: 150,
      render: (text, record) => {
        return (
          <span className="text-xxs">
            {record?.started_at
              ? moment(record?.started_at, 'YYYY-MM-DD HH:mm:ss').format(
                  'DD/MM/YYYY',
                )
              : ''}
          </span>
        );
      },
    },
    {
      title: <div className="text-xxs">Ngày chuyển đến</div>,
      dataIndex: '',
      width: 150,
      render: (text, record) => {
        return (
          <span className="text-xxs">
            {record?.created_at
              ? moment(record?.created_at, 'YYYY-MM-DD HH:mm:ss').format(
                  'DD/MM/YYYY',
                )
              : ''}
          </span>
        );
      },
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
        <FormManeuver
          onRefetch={refetch}
          id={idColumn}
          open={isOpenForm}
          onClose={() => setIsOpenForm(false)}
        />
      )}
    </>
  );
};

export default TableManeuver;
