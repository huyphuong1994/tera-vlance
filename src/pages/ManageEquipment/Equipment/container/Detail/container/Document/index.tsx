import DetailTabHeader from '../Header/DetailTabHeader';
import React, { useState } from 'react';
import { Tabs } from 'tera-dls';
import TableRegistry from './TableRegistry';
import TableInsurance from './TableInsurance';

function EquipmentDetailDocument() {
  const [tab, setTab] = useState<string>('registry');

  const tabs = [
    {
      key: 'registry',
      label: <div className="text-xxs uppercase">Thông tin đăng kiểm</div>,
    },
    {
      key: 'insurance',
      label: <div className="text-xxs uppercase">Thông tin bảo hành</div>,
    },
  ];

  const handleChangeTabs = (key: string): void => setTab(key);

  return (
    <>
      <DetailTabHeader
        type={'dropdown'}
        onClickButtonAdd={() => {
          return '';
        }}
      ></DetailTabHeader>
      <div className="mt-5">
        <Tabs
          activeKey={tab}
          className="mb-0"
          items={tabs}
          onChange={handleChangeTabs}
        />
        {tab == 'registry' ? (
          <>
            <TableRegistry />
          </>
        ) : (
          <>
            <TableInsurance />
          </>
        )}
      </div>
    </>
  );
}

export default EquipmentDetailDocument;
