import {
  ArrowSmallLeftSolid,
  Breadcrumb,
  Button,
  ItemType,
  notification,
  PencilSquareOutlined,
  XMarkOutlined,
} from 'tera-dls';
import { useNavigate, useParams } from 'react-router-dom';
import { EQUIPMENT_PAGE_URL } from '../../../../../../../_common/constants/url';
import EquipmentForm from '../../../Form';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useConfirm from '../../../../../../../_common/hooks/useConfirm';
import EquipmentPageApi from '../../../../_api';
import { messageError } from '../../../../../../../_common/constants/message';

function EquipmentDetailHeader() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { equipmentId } = useParams();
  const confirm = useConfirm();

  const [formModel, setFormModel] = useState<boolean>(false);

  const breadcrumbItem: ItemType[] = [
    {
      title: (
        <a
          className="cursor-pointer"
          onClick={() => navigate(`${EQUIPMENT_PAGE_URL.list.shortenUrl}`)}
        >
          Danh sách thiết bị
        </a>
      ),
    },
    {
      title: 'Chi tiết thiết bị',
    },
  ];

  const { mutate: deleteColumn } = useMutation(
    (id: number | string) => EquipmentPageApi.deleteEquipment(id),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          navigate(`${EQUIPMENT_PAGE_URL.list.shortenUrl}`);
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

  return (
    <>
      <div className="page-header">
        <div className="p-3 page-header__breadcrumb">
          <div
            className="cursor-pointer page-header__breadcrumb-back"
            onClick={() => navigate(-1)}
          >
            <ArrowSmallLeftSolid width={24} height={24} />
          </div>
          <Breadcrumb separator={'>'} items={breadcrumbItem} />
        </div>

        <div className="flex justify-between page-header__function">
          <div className="flex gap-2.5">
            <Button
              type="danger"
              className="page-header-btn"
              onClick={() => handleDelete(+equipmentId, '')}
            >
              Xóa
              <XMarkOutlined width={'1rem'} height={'1rem'} />
            </Button>
            <Button
              className="page-header-btn"
              onClick={() => {
                setFormModel(true);
              }}
            >
              Sửa
              <PencilSquareOutlined width={'1rem'} height={'1rem'} />
            </Button>
          </div>
          {/*<Dropdown*/}
          {/*  menu={{*/}
          {/*    items: itemsDropdown,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Button*/}
          {/*    type="alternative"*/}
          {/*    icon={<AdjustmentsHorizontalOutlined />}*/}
          {/*  />*/}
          {/*</Dropdown>*/}
        </div>
      </div>
      {formModel && (
        <EquipmentForm
          onRefetch={() =>
            queryClient.invalidateQueries(['get-table-equipment-list'])
          }
          id={equipmentId}
          open={formModel}
          onClose={() => setFormModel(false)}
        />
      )}
    </>
  );
}

export default EquipmentDetailHeader;
