import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Modal, Spin, Tag, notification } from 'tera-dls';
import ColumnConfigApi from '../../_api';
import { messageError } from '_common/constants/message';
import { statusOnOffNumber, statusOnOffString } from '../../../constants';
import { formatDate } from '_common/utils';

interface ColumnConfigDetailProps {
  open: boolean;
  id: number | string;
  onClose: () => void;
}

function ColumnConfigDetail({ open, onClose, id }: ColumnConfigDetailProps) {
  const { data, isLoading, isError, refetch } = useQuery(
    ['get-detail-column-config', id],
    () => ColumnConfigApi.getDetail(id),
    {
      enabled: !!id,
      cacheTime: 300000,
      staleTime: 300000,
    },
  );

  const renderDetail = () => {
    const details = [
      {
        title: 'Mã cột dữ liệu',
        value: data?.concatenated_code,
      },
      {
        title: 'Tiêu đề',
        value: data?.title,
      },
      {
        title: 'Loại dữ liệu',
        value: data?.type,
      },
      {
        title: 'Key dữ liệu',
        value: data?.key,
      },
      {
        title: 'className',
        value: data?.class_name,
      },
      {
        title: 'Độ rộng',
        value: data?.width,
      },
      {
        title: 'Căn lề',
        value: data?.align,
      },
      {
        title: 'Thứ tự đứng sau',
        value: data?.standing_behind === 0 ? '' : data?.standing_behind?.title,
      },
      {
        title: 'Trạng thái',
        value: (
          <Tag color={statusOnOffString[data?.status]?.color}>
            {statusOnOffString[data?.status]?.name}
          </Tag>
        ),
      },
      {
        title: 'Hiển thị trên Desktop',
        subTitle: '(>1600px)',
        value: (
          <Tag color={statusOnOffNumber[data?.show_desktop]?.color}>
            {statusOnOffNumber[data?.show_desktop]?.name}
          </Tag>
        ),
      },
      {
        title: 'Hiển thị trên Table lớn',
        subTitle: '(>1200px)',
        value: (
          <Tag color={statusOnOffNumber[data?.hide_tablet_lg]?.color}>
            {statusOnOffNumber[data?.hide_tablet_lg]?.name}
          </Tag>
        ),
      },
      {
        title: 'Hiển thị trên Table nhỏ',
        subTitle: '(>960px)',
        value: (
          <Tag color={statusOnOffNumber[data?.hide_tablet]?.color}>
            {statusOnOffNumber[data?.hide_tablet]?.name}
          </Tag>
        ),
      },
      {
        title: 'Hiển thị trên mobile',
        subTitle: '(<769px)',
        value: (
          <Tag color={statusOnOffNumber[data?.show_mobile]?.color}>
            {statusOnOffNumber[data?.show_mobile]?.name}
          </Tag>
        ),
      },
      {
        title: 'Người tạo',
        value: data?.employee_created?.full_name,
      },
      {
        title: 'Ngày tạo',
        value: formatDate(data?.created_at, 'DD/MM/YYYY - HH:mm'),
      },
      {
        title: 'Người cập nhật',
        value: data?.employee_updated?.full_name,
      },
      {
        title: 'Ngày cập nhật',
        value:
          !!data?.employee_updated &&
          formatDate(data?.updated_at, 'DD/MM/YYYY - HH:mm'),
      },
    ];
    return details;
  };

  useEffect(() => {
    if (id) refetch();
  }, [id]);

  if (isError) {
    onClose();
    notification.error({
      message: messageError.DATA_NOT_FOUND,
    });
  }

  return (
    <Modal
      centered
      closeIcon={false}
      open={open}
      width={418}
      title="CHI TIẾT CỘT DỮ LIỆU"
      cancelText="Đóng"
      okButtonProps={{ className: 'hidden' }}
      onCancel={onClose}
    >
      <Spin spinning={isLoading}>
        <div className="grid gap-y-2.5">
          {renderDetail().map((item, index) => {
            return (
              <div className="flex items-start" key={index}>
                <h6
                  className={
                    item?.subTitle
                      ? 'detail-key !line-clamp-2 leading-[14px]'
                      : 'detail-key'
                  }
                >
                  <span>{item?.title}</span>
                  {item?.subTitle && (
                    <p className="font-light text-gray-500 leading-[14px]">
                      {item?.subTitle}
                    </p>
                  )}
                </h6>
                <span className="detail-value">{item?.value}</span>
              </div>
            );
          })}
        </div>
      </Spin>
    </Modal>
  );
}

export default ColumnConfigDetail;
