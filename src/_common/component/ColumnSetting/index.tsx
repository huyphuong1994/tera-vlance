import { Button, Modal } from 'tera-dls';
import ColumnSettingOverview from './ColumnSettingOverview';

interface IProps {
  open: boolean;
  object_type: string;
  modalProps?: any;
  onClose: () => void;
}
const ColumnSetting = (props: IProps) => {
  const { open, object_type, onClose, modalProps = {} } = props;
  return (
    <Modal
      centered={true}
      title="Danh sách dữ liệu cột"
      open={open}
      width={1500}
      closeIcon={false}
      okText="Đồng ý"
      cancelText="Huỷ"
      {...modalProps}
      onCancel={onClose}
      footer={
        <div className="w-[100%]">
          <div className="w-auto h-[1px] bg-[#E5E7EB] mb-6"></div>
          <Button className="float-right rounded-xsm" onClick={onClose}>
            Đóng
          </Button>
        </div>
      }
      destroyOnClose={true}
    >
      <ColumnSettingOverview objectType={object_type} />
    </Modal>
  );
};

export default ColumnSetting;
