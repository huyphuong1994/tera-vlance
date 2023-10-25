import DetailTabHeader from '../Common/DetailTabHeader';
import React, { useState } from 'react';
import { notification, PaginationProps, Table } from 'tera-dls';
import ActionCUD from '../../../../../../../_common/component/TableColumnCustom/ActionCUD';
import PaginationCustom from '../../../../../../../_common/component/PaginationCustom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { filterField, formatNumber } from '../../../../../../../_common/utils';
import { messageError } from '../../../../../../../_common/constants/message';
import { updateURLQuery } from '../../../../../../System/containers/ManagePage/TableConfig/container/Table';
import { useNavigate } from 'react-router-dom';
import { BUTTON_KEY } from '../../../../../../../_common/constants/permission';
import EquipmentFixApi from '../../_api';
import { IFormEquipmentFix, IFormModel } from '../../interfaces';
import FormFix from '../Form/FormFix';
import useConfirm from '../../../../../../../_common/hooks/useConfirm';
import DetailManeuver from '../Form/FormManeuver';

interface IParams {
  page: number;
  limit: number;
}

function EquipmentDetailRecords() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
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
        params: filterField({ ...params }),
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
    console.log('2', id);
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
      title: 'STT',
      dataIndex: '',
      width: 80,
      fixed: 'center',
      render: (_, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: 'Dự án',
      dataIndex: '',
      width: 350,
      align: 'left',
      render: (_, record) => {
        return (
          <div>
            <span>Mã thiết bị</span>
            <span>- Tên thiết bị dự án </span>
            <span>{record?.project?.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      width: 200,
    },
    {
      title: 'Thời gian',
      dataIndex: 'fixed_at',
      width: 200,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'units',
      width: 100,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: 'VAT(%)',
      dataIndex: 'vat',
      width: 80,
    },
    {
      title: 'Thành tiền (đ)',
      dataIndex: 'sum_total',
      width: 150,
      render: (text) => formatNumber(text),
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
          <DetailManeuver
            open={openDetail}
            onClose={() => setOpenDetail(false)}
            detailInfo={recordDetail}
          />
        )}
      </div>
    </>
  );
}

export default EquipmentDetailRecords;
