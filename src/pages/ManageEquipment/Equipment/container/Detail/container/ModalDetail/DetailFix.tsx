import { IFormEquipmentFix } from '../../interfaces';
import { Modal } from 'tera-dls';

interface IDetailFixProps {
  open: boolean;
  onClose: () => void;
  detailInfo: IFormEquipmentFix;
}

function DetailFix(props: IDetailFixProps) {
  const { open, onClose, detailInfo } = props;

  const handleCloseModal = () => {
    onClose();
  };

  console.log('123', detailInfo);
  return (
    <>
      <Modal
        centered={true}
        title={'CHI TIẾT SỬA CHỮA'}
        open={open}
        width={1000}
        closeIcon={false}
        cancelText="Đóng"
        okButtonProps={{ className: 'hidden' }}
        onCancel={handleCloseModal}
      >
        <div className="grid grid-cols-10 gap-5">
          <ul className="col-span-2">
            <li className="text-xxs font-semibold mb-2.5">Tên thiết bị</li>
            <li className="text-xxs font-semibold mb-2.5">Ngày sửa</li>
            <li className="text-xxs font-semibold mb-2.5">Ngày thanh toán</li>
            <li className="text-xxs font-semibold mb-2.5">Người theo dõi</li>
            <li className="text-xxs font-semibold mb-2.5">Vị trí</li>
            <li className="text-xxs font-semibold mb-2.5">Số lượng</li>
            <li className="text-xxs font-semibold mb-2.5">VAT%</li>
            <li className="text-xxs font-semibold mb-2.5">Đơn vị tính</li>
            <li className="text-xxs font-semibold mb-2.5">Giá</li>
            <li className="text-xxs font-semibold mb-2.5">Thành tiền</li>
            <li className="text-xxs font-semibold mb-2.5">Nội dung</li>
          </ul>
          <ul className="col-span-8">
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Tên thiết bị
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Ngày sửa
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Ngày thanh toán
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Người theo dõi
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Vị trí
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Số lượng
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">VAT%</li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Đơn vị tính
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">Giá</li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Thành tiền
            </li>
            <li className="text-xxs text-gray-800 font-normal mb-2.5">
              Nội dung
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default DetailFix;
