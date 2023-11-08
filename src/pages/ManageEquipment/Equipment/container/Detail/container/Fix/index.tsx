import DetailTabHeader from '../Common/DetailTabHeader';
import React, { useState } from 'react';
import { notification, PaginationProps, Table } from 'tera-dls';
import ActionCUD from '../../../../../../../_common/component/TableColumnCustom/ActionCUD';
import PaginationCustom from '../../../../../../../_common/component/PaginationCustom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { filterField, formatNumber } from '../../../../../../../_common/utils';
import { messageError } from '../../../../../../../_common/constants/message';
import { updateURLQuery } from '../../../../../../System/containers/ManagePage/TableConfig/container/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { BUTTON_KEY } from '../../../../../../../_common/constants/permission';
import { EquipmentFixApi } from '../../_api';
import { IFormEquipmentFix, IFormModel } from '../../interfaces';
import FormFix from '../Form/FormFix';
import useConfirm from '../../../../../../../_common/hooks/useConfirm';
import DetailFix from '../ModalDetail/DetailFix';

interface IParams {
  page: number;
  limit: number;
}

function EquipmentDetailFix() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const { equipmentId } = useParams();
  const [formModel, setFormModel] = useState<IFormModel>({ open: false });
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [recordDetail, setRecordDetail] = useState<IFormEquipmentFix>();
  const [params, setParams] = useState<IParams>({ page: 1, limit: 10 });
  const [idColumn, setIdColumn] = useState<number | string>(null);
  const buttonKey = {
    create: BUTTON_KEY.COLUMN_CONFIG_LIST_CREATE,
    update: BUTTON_KEY.COLUMN_CONFIG_LIST_UPDATE,
    detail: BUTTON_KEY.COLUMN_CONFIG_LIST_DETAIL,
    delete: BUTTON_KEY.COLUMN_CONFIG_LIST_DELETE,
  };

  const { data, refetch } = useQuery(
    ['get-table-equipment-fix-list', params],
    () =>
      EquipmentFixApi.getEquipmentFixList({
        params: filterField({ ...params, machine_id: equipmentId }),
      }),
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

  const handleDetail = (record: IFormEquipmentFix) => {
    setOpenDetail(true);
    setRecordDetail(record);
  };

  const handleUpdate = (id: number) => {
    setFormModel({ open: true });
    setIdColumn(id);
  };

  const { mutate: deleteColumn } = useMutation(
    (id: number | string) => EquipmentFixApi.deleteEquipmentFix(id),
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

  const columns: any = [
    {
      title: <div className="text-xxs">STT</div>,
      dataIndex: '',
      width: 80,
      fixed: 'center',
      render: (_, record, index) => {
        return (
          <span className="text-xxs">
            {index + (params.page - 1) * params.limit + 1}
          </span>
        );
      },
    },
    {
      title: <div className="text-xxs">Dự án</div>,
      dataIndex: '',
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
                      {'Mã thiết bị'}
                    </span>
                    <span className="text-xxs">{' - Tên thiết bị'}</span>
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
      title: <div className="text-xxs">Nội dung</div>,
      dataIndex: 'content',
      width: 200,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: <div className="text-xxs">Thời gian</div>,
      dataIndex: 'fixed_at',
      width: 200,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: <div className="text-xxs">Đơn vị</div>,
      dataIndex: 'units',
      width: 100,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: <div className="text-xxs">Số lượng</div>,
      dataIndex: 'quantity',
      width: 100,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: <div className="text-xxs">Đơn giá</div>,
      dataIndex: 'price',
      width: 150,
      render: (text) => <span className="text-xxs">{formatNumber(text)}</span>,
    },
    {
      title: <div className="text-xxs">VAT(%)</div>,
      dataIndex: 'vat',
      width: 80,
      render: (text) => {
        return <span className="text-xxs">{text}</span>;
      },
    },
    {
      title: <div className="text-xxs">Thành tiền (đ)</div>,
      dataIndex: 'sum_total',
      width: 150,
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
              onClickDetail={() => handleDetail(record)}
              onClickUpdate={() => handleUpdate(record?.id)}
              onClickDelete={() => handleDelete(record?.id, record?.content)}
            ></ActionCUD>
          </>
        );
      },
    },
  ];

  return (
    <>
      <DetailTabHeader
        onClickButtonAdd={() => setFormModel({ open: true })}
      ></DetailTabHeader>
      <div className="mt-5">
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
        {formModel.open && (
          <FormFix
            onRefetch={() =>
              queryClient.invalidateQueries(['get-table-equipment-fix-list'])
            }
            id={idColumn}
            open={formModel.open}
            onClose={() => setFormModel({ open: false })}
          />
        )}
        {openDetail && (
          <DetailFix
            open={openDetail}
            onClose={() => setOpenDetail(false)}
            detailInfo={recordDetail}
          />
        )}
      </div>
    </>
  );
}

export default EquipmentDetailFix;
