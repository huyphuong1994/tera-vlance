import { IFormEquipmentManeuver } from '../../interfaces';
import { Modal } from 'tera-dls';

interface IDetailManeuverProps {
  open: boolean;
  onClose: () => void;
  detailInfo: IFormEquipmentManeuver;
}

function DetailManeuver(props: IDetailManeuverProps) {
  const { open, onClose, detailInfo } = props;

  const handleCloseModal = () => {
    onClose();
  };

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
        <div className="">
          <ul className="">
            <li>
              <div>Tên thiết bị</div>
              <div>{detailInfo.content}</div>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default DetailManeuver;
