import { usePermission } from '_common/hooks/usePermission';
import classnames from 'classnames';
import React from 'react';
import {
  ArrowDownTrayOutlined,
  EyeOutlined,
  PencilSquareOutlined,
  Tooltip,
  TrashOutlined,
} from 'tera-dls';

type typeButton = 'detail' | 'update' | 'delete' | 'download';

interface ActionCUDProps {
  onClickDetail?: () => void;
  onClickUpdate?: () => void;
  onClickDelete?: () => void;
  onClickDownload?: () => void;
  buttonKey?: {
    detail?: string;
    update?: string;
    delete?: string;
  };
  classNames?: string;
  classNameButtonDetail?: string;
  classNameButtonUpdate?: string;
  classNameButtonDelete?: string;
  propsButtonDetail?: {
    [key: string]: any;
  };
  propsButtonUpdate?: {
    [key: string]: any;
  };
  propsButtonDelete?: {
    [key: string]: any;
  };
  activeButtons?: Array<typeButton>;
}

function ActionCUD({
  onClickDetail,
  onClickUpdate,
  onClickDelete,
  onClickDownload,
  classNames,
  classNameButtonDetail,
  classNameButtonUpdate,
  classNameButtonDelete,
  propsButtonDetail,
  propsButtonUpdate,
  propsButtonDelete,
  buttonKey,
  activeButtons = ['detail', 'update', 'delete'],
}: ActionCUDProps) {
  const { hasPage } = usePermission();

  const classNameButton = 'w-6 h-6 cursor-pointer';

  const classNameDiv = classnames(
    'flex items-center justify-center gap-x-2.5',
    classNames,
  );

  const classNameDetail = classnames(
    classNameButton,
    'text-blue-600',
    classNameButtonDetail,
  );
  const classNameUpdate = classnames(
    classNameButton,
    'text-green-500',
    classNameButtonUpdate,
  );
  const classNameDelete = classnames(
    classNameButton,
    'text-red-600',
    classNameButtonDelete,
  );
  const classNameDownload = classnames(classNameButton);

  const checkPermissionButton = (key: string): boolean =>
    key ? hasPage(key) : true;

  return (
    <div className={classNameDiv}>
      {activeButtons.includes('detail') &&
        typeof onClickDetail === 'function' &&
        checkPermissionButton(buttonKey?.detail) && (
          <Tooltip title="Chi tiết">
            <div>
              <EyeOutlined
                className={classNameDetail}
                onClick={onClickDetail}
                {...propsButtonDetail}
              />
            </div>
          </Tooltip>
        )}
      {activeButtons.includes('update') &&
        typeof onClickUpdate === 'function' &&
        checkPermissionButton(buttonKey?.update) && (
          <Tooltip title="Sửa">
            <div>
              <PencilSquareOutlined
                className={classNameUpdate}
                onClick={onClickUpdate}
                {...propsButtonUpdate}
              />
            </div>
          </Tooltip>
        )}
      {activeButtons.includes('delete') &&
        typeof onClickDelete === 'function' &&
        checkPermissionButton(buttonKey?.delete) && (
          <Tooltip title="Xoá">
            <div>
              <TrashOutlined
                className={classNameDelete}
                onClick={onClickDelete}
                {...propsButtonDelete}
              />
            </div>
          </Tooltip>
        )}
      {activeButtons.includes('download') &&
        typeof onClickDownload === 'function' && (
          <Tooltip title="Tải xuống">
            <div>
              <ArrowDownTrayOutlined
                onClick={onClickDownload}
                className={classNameDownload}
              />
            </div>
          </Tooltip>
        )}
    </div>
  );
}

export default ActionCUD;
