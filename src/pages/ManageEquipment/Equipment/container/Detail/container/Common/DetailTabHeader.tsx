import { Button, MagnifyingGlassOutlined, PlusCircleOutlined } from 'tera-dls';
import React from 'react';
import EquipmentPageHeader from '../../../Header';

interface IProps {
  onClickButtonAdd?: () => void;
}
function DetailTabHeader({ onClickButtonAdd }: IProps) {
  const handleSearch = () => {
    return ';';
  };

  return (
    <>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <EquipmentPageHeader onSearch={handleSearch} />
            <Button
              onClick={onClickButtonAdd}
              className="rounded-xsm shrink-0 ml-2.5 py-[5px] px-2.5"
            >
              <div className="flex items-center gap-1 shrink-0">
                <MagnifyingGlassOutlined className="w-5 h-5" />
                <span className="text-xxs">Tìm kiếm</span>
              </div>
            </Button>
          </div>
          <div>
            <Button
              onClick={onClickButtonAdd}
              className="rounded-xsm shrink-0 py-[5px] px-2.5"
            >
              <div className="flex items-center gap-1 shrink-0">
                <PlusCircleOutlined className="w-5 h-5" />
                <span className="text-xxs">Thêm mới</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailTabHeader;
