import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Description, Modal, Spin, Tag } from 'tera-dls';
import ControlConfigApi from '../../_api';
import { statusConfigColor } from 'pages/System/constants';
import { ResponseDetailControl } from '../../interfaces';
interface DetailControlConfigProps {
  open: boolean;
  onCloseModal: () => void;
  id: number;
}
const DetailControlConfig = ({
  id,
  onCloseModal,
  open,
}: DetailControlConfigProps) => {
  const { data, isLoading } = useQuery<ResponseDetailControl>(
    ['get-detail-control-config', id],
    () => ControlConfigApi.getDetail(id),
  );
  return (
    <Modal
      centered
      width="25vw"
      title="Chi tiết control"
      okText="Đóng"
      open={open}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      cancelButtonProps={{ className: 'hidden' }}
      closeIcon={false}
      destroyOnClose
    >
      <Spin spinning={isLoading && !!id}>
        <Description label="Mã control">{data?.code}</Description>
        <Description label="Tiêu đề">{data?.title}</Description>
        <Description label="Giá trị">{data?.value}</Description>
        <Description label="Nhóm control">
          {data?.group_control?.title}
        </Description>
        <Description label="Màu sắc">{data?.color}</Description>
        <Description label="className">{data?.class_name}</Description>
        <Description label="Thứ tự đứng sau">
          {data?.item_prev_order?.title}
        </Description>
        <Description label="Trạng thái">
          <Tag color={statusConfigColor[data?.status as string]}>
            {data?.status_text}
          </Tag>
        </Description>
        <Description label="Người tạo">
          {data?.employee_created &&
            `${data?.employee_created?.code} - ${data?.employee_created?.full_name}`}
        </Description>
        <Description label="Ngày tạo">
          {data?.created_at_format || data?.created_at}
        </Description>
        <Description label="Người cập nhật">
          {data?.employee_updated &&
            `${data?.employee_updated?.code} - ${data?.employee_updated?.full_name}`}
        </Description>
        <Description label="Ngày cập nhật">
          {data?.updated_by && (data?.updated_at_format || data?.updated_at)}
        </Description>
      </Spin>
    </Modal>
  );
};

export default DetailControlConfig;
