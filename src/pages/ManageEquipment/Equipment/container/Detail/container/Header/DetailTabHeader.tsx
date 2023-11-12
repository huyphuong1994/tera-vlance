import {
  ChevronDownOutlined,
  Button,
  Dropdown,
  DropdownItem,
  MagnifyingGlassOutlined,
  PlusCircleOutlined,
} from 'tera-dls';
import React, { useState } from 'react';
import EquipmentPageHeader from '../../../Header';
import FormRegistry from '../Form/FormRegistry';
import FormInsurance from '../Form/FormInsurance';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  onClickButtonAdd?: () => void;
  type: 'dropdown' | 'button';
}

function DetailTabHeader({ onClickButtonAdd, type }: IProps) {
  const queryClient = useQueryClient();
  const [openFormRegistry, setOpenFormRegistry] = useState<boolean>(false);
  const [openFormInsurance, setOpenFormInsurance] = useState<boolean>(false);
  const handleSearch = () => {
    return ';';
  };

  const itemsDropdown: DropdownItem[] = [
    {
      label: 'Thông tin đăng kiểm',
      key: 'Export',
      onClick: () => setOpenFormRegistry(true),
    },
    {
      label: 'Thông tin bảo hành',
      key: 'Import',
      onClick: () => setOpenFormInsurance(true),
    },
  ];

  return (
    <>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <EquipmentPageHeader onSearch={handleSearch} />
            <Button
              onClick={onClickButtonAdd}
              className="rounded-xsm shrink-0 ml-2.5 px-2.5"
            >
              <div className="flex items-center gap-1 shrink-0">
                <MagnifyingGlassOutlined className="w-5 h-5" />
                <span className="text-xxs">Tìm kiếm</span>
              </div>
            </Button>
          </div>
          <div className="flex items-center">
            {type == 'dropdown' ? (
              <Dropdown
                trigger="click"
                menu={{
                  items: itemsDropdown,
                }}
              >
                <Button
                  onClick={onClickButtonAdd}
                  className="rounded-xsm shrink-0 px-2.5 py-0"
                >
                  <div className="flex items-center gap-1 shrink-0 pr-2">
                    <PlusCircleOutlined className="w-5 h-5" />
                    <span className="text-xxs">Thêm mới</span>
                  </div>
                  <div className="border-l h-full pl-2 flex items-center py-2.5">
                    <ChevronDownOutlined className="w-5 h-5" />
                  </div>
                </Button>
              </Dropdown>
            ) : (
              <></>
            )}
            {type == 'button' ? (
              <Button
                onClick={onClickButtonAdd}
                className="rounded-xsm shrink-0 px-2.5"
              >
                <div className="flex items-center gap-1 shrink-0">
                  <PlusCircleOutlined className="w-5 h-5" />
                  <span className="text-xxs">Thêm mới</span>
                </div>
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {openFormRegistry ? (
        <FormRegistry
          open={openFormRegistry}
          onClose={() => setOpenFormRegistry(false)}
          onRefetch={() =>
            queryClient.invalidateQueries(['get-table-equipment-registry-list'])
          }
        />
      ) : (
        ''
      )}
      {openFormInsurance ? (
        <FormInsurance
          open={openFormInsurance}
          onClose={() => setOpenFormInsurance(false)}
          onRefetch={() => {
            queryClient.invalidateQueries([
              'get-table-equipment-insurance-list',
            ]);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default DetailTabHeader;
