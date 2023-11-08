import React, { useState } from 'react';
import { notification, PaginationProps, Table } from 'tera-dls';
import ActionCUD from '../../../../../../../_common/component/TableColumnCustom/ActionCUD';
import PaginationCustom from '../../../../../../../_common/component/PaginationCustom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { filterField } from '../../../../../../../_common/utils';
import { messageError } from '../../../../../../../_common/constants/message';
import { updateURLQuery } from '../../../../../../System/containers/ManagePage/TableConfig/container/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { BUTTON_KEY } from '../../../../../../../_common/constants/permission';
import { EquipmentInsuranceApi } from '../../_api';
import { IFormEquipmentFix, IFormModel } from '../../interfaces';
import useConfirm from '../../../../../../../_common/hooks/useConfirm';
import DetailManeuver from '../ModalDetail/DetailManeuver';
import moment from 'moment';
import FormManeuver from 'pages/ManageEquipment/Common/Container/FormManeuver';

interface IParams {
  page: number;
  limit: number;
}

function EquipmentDetailInsurance() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { equipmentId } = useParams();
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
    ['get-table-equipment-insurance-list', params],
    () =>
      EquipmentInsuranceApi.getEquipmentInsuranceList({
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
    console.log('2', id);
  };

  const { mutate: deleteColumn } = useMutation(
    (id: number | string) => EquipmentInsuranceApi.deleteEquipmentInsurance(id),
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
        return <span className="text-xxs">{index + 1}</span>;
      },
    },
    {
      title: <div className="text-xxs">Ngày bắt đầu</div>,
      dataIndex: 'started_at',
      width: 100,
      render: (status: string, record) => (
        <span className="text-xxs">
          {record?.started_at
            ? moment(record?.started_at, 'YYYY-MM-DD HH:mm:ss').format(
                'DD/MM/YYYY',
              )
            : ''}
        </span>
      ),
    },
    {
      title: <div className="text-xxs">Ngày kết thúc</div>,
      dataIndex: 'finished_at',
      width: 150,
      render: (text, record) => {
        return (
          <span className="text-xxs">
            {record?.finished_at
              ? moment(record?.finished_at, 'YYYY-MM-DD HH:mm:ss').format(
                  'DD/MM/YYYY',
                )
              : ''}
          </span>
        );
      },
    },
    {
      title: <div className="text-xxs">Nơi đăng ký</div>,
      dataIndex: 'address',
      width: 150,
      render: (text, record) => {
        return (
          <span className="text-xxs">
            {record?.address ? record?.address : ''}
          </span>
        );
      },
    },
    {
      title: <div className="text-xxs">Ghi chú</div>,
      dataIndex: 'note',
      width: 150,
      render: (text, record) => {
        return (
          <span className="text-xxs">{record?.note ? record?.note : ''}</span>
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
          <FormManeuver
            onRefetch={() =>
              queryClient.invalidateQueries([
                'get-table-equipment-maneuver-list',
              ])
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

export default EquipmentDetailInsurance;
