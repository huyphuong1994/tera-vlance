import { IFormCategory } from '../../interfaces';
import { Modal } from 'tera-dls';

interface IDetailCategoryProps {
  open: boolean;
  onClose: () => void;
  detailInfo: IFormCategory;
}

function DetailCategory(props: IDetailCategoryProps) {
  const { open, onClose, detailInfo } = props;

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <Modal
        centered={true}
        title={'CHI TIẾT NHÓM THIẾT BỊ'}
        open={open}
        width={500}
        closeIcon={false}
        cancelText="Đóng"
        okButtonProps={{ className: 'hidden' }}
        onCancel={handleCloseModal}
      >
        <div className="grid grid-cols-10 gap-5">
          <ul className="col-span-4">
            <li className="text-xxs font-semibold mb-2.5">Tên nhóm thiết bị</li>
            <li className="text-xxs font-semibold mb-2.5">Mã nhóm thiết bị</li>
            <li className="text-xxs font-semibold mb-2.5">
              Số thiết bị có trong nhóm
            </li>
          </ul>
          <ul className="col-span-6">
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              {detailInfo.title}
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              {detailInfo.code}
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              {detailInfo.total}
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default DetailCategory;
