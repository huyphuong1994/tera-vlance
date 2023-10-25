import React, { useMemo } from 'react';
import { Modal } from 'tera-dls';
import NoData from '../NoData';

interface ModalViewMoreProps {
  title: string;
  open: boolean;
  onCloseModal: () => void;
  content: React.ReactNode | string[] | string;
  width?: number;
}

function ModalViewMore({
  title,
  open,
  onCloseModal,
  content,
  width,
}: ModalViewMoreProps) {
  const renderContent = useMemo(() => {
    if (!content) return <NoData />;

    if (typeof content === 'string') {
      return <div>{content}</div>;
    }

    if (Array.isArray(content)) {
      return (
        <ul className="pl-5 list-disc flex flex-col gap-y-2.5 max-h-[50vh] overflow-scroll">
          {content?.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      );
    }

    return <>{content}</>;
  }, [content]);

  return (
    <Modal
      width={width}
      centered
      title={title}
      cancelText="Đóng"
      open={open}
      onCancel={onCloseModal}
      okButtonProps={{ className: 'hidden' }}
      closeIcon={false}
    >
      {renderContent}
    </Modal>
  );
}

export default ModalViewMore;
