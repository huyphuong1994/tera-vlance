import { useStores } from '_common/hooks';
import { AdjustmentsHorizontalOutlined, Button, Dropdown } from 'tera-dls';

interface IProps {
  objectType: string;
}
const SettingColumnButton = (props: IProps) => {
  const { objectType } = props;

  const {
    columnSettingStore: { openColumnSettingModal },
  } = useStores();

  const handleSettingColumn = (): void => {
    openColumnSettingModal(objectType);
  };

  const items = [
    {
      label: <a onClick={handleSettingColumn}>Cấu hình cột</a>,
      key: '0',
    },
  ];

  return (
    <Dropdown
      containerClassName="z-[2000] w-auto"
      menu={{ items }}
      trigger="click"
      placement={'bottom-end'}
    >
      <Button
        className="p-2"
        type="alternative"
        icon={<AdjustmentsHorizontalOutlined className="text-gray-400" />}
      />
    </Dropdown>
  );
};

export default SettingColumnButton;
