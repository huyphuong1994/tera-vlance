import { useQuery } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { Description, Modal, Spin } from 'tera-dls';
import ConfigPermissionApi from '../../_api';
import { ResponseDetailRole } from '../../interfaces';
interface DetailConfigPermissionProps {
  open: boolean;
  onCloseModal: () => void;
  id: string | number;
}
interface GridDescriptionProps {
  label?: string;
  children?: ReactNode;
}
const DetailConfigPermission = ({
  id,
  onCloseModal,
  open,
}: DetailConfigPermissionProps) => {
  const { data, isLoading } = useQuery<ResponseDetailRole>(
    ['get-detail-config-permission', id],
    () => ConfigPermissionApi.getDetail(id),
  );

  const GridDescription = ({ label, children }: GridDescriptionProps) => {
    return (
      <Description
        label={label}
        className="grid-cols-4 gap-5"
        childrenClassName="col-span-3"
      >
        {children}
      </Description>
    );
  };
  return (
    <Modal
      centered
      title="Chi tiết quyền"
      okText="Đóng"
      className="sm:w-3/5 lg:w-1/4"
      open={open}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      cancelButtonProps={{ className: 'hidden' }}
      closeIcon={false}
      destroyOnClose
    >
      <Spin spinning={isLoading && !!id}>
        <GridDescription label="Mã quyền">{data?.code}</GridDescription>
        <GridDescription label="Tiêu đề">{data?.title}</GridDescription>
        <GridDescription label="Ghi chú">{data?.note}</GridDescription>
        <GridDescription label="Người tạo">
          {data?.employee_created &&
            `${data?.employee_created?.code} - ${data?.employee_created?.full_name}`}
        </GridDescription>
        <GridDescription label="Ngày tạo">
          {data?.created_at_format || data?.created_at}
        </GridDescription>
        <GridDescription label="Người cập nhật">
          {data?.employee_updated &&
            `${data?.employee_updated?.code} - ${data?.employee_updated?.full_name}`}
        </GridDescription>
        <GridDescription label="Ngày cập nhật">
          {data?.updated_by && (data?.updated_at_format || data?.updated_at)}
        </GridDescription>
      </Spin>
    </Modal>
  );
};

export default DetailConfigPermission;
