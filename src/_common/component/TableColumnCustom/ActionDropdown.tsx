import { usePermission } from '_common/hooks/usePermission';
import React from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownProps,
  EllipsisHorizontalOutlined,
  EyeOutlined,
  Tooltip,
} from 'tera-dls';

interface ActionDropdown extends DropdownProps {
  onClickDetail?: () => void;
  dropdownItems: DropdownItem[];
  callBack?: () => void;
  buttonDetailKey?: string;
}

function ActionDropdown({
  dropdownItems,
  buttonDetailKey,
  callBack,
  onClickDetail,
  ...rest
}: ActionDropdown) {
  const { hasPage } = usePermission();

  const checkPermissionButton = (key: string): boolean =>
    key ? hasPage(key) : true;

  return (
    <div className="flex items-center justify-center gap-x-2.5">
      {onClickDetail && checkPermissionButton(buttonDetailKey) && (
        <Tooltip title="Chi tiết">
          <div>
            <EyeOutlined
              className="h-6 w-6 text-blue-600 cursor-pointer"
              onClick={onClickDetail}
            />
          </div>
        </Tooltip>
      )}
      <Dropdown menu={{ items: dropdownItems }} {...rest}>
        <Button
          onClick={() => callBack && callBack()}
          type="alternative"
          className="rounded-xsm"
          icon={<EllipsisHorizontalOutlined />}
        />
      </Dropdown>
    </div>
  );
}

export default ActionDropdown;
