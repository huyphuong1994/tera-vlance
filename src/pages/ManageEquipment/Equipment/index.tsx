import HeaderViewList from '../../../_common/component/HeaderViewList';
import { BUTTON_KEY } from '../../../_common/constants/permission';
import EquipmentPageHeader from './container/Header';
import { useState } from 'react';
import { Tabs } from 'tera-dls';
import TableEquipment from './container/Table';
import { statusSummary } from './constants';
import { IItemSummary, IFormModel } from './interfaces';
import EquipmentForm from './container/Form';
import { useQueryClient } from '@tanstack/react-query';

const EquipmentList = () => {
  const [formModel, setFormModel] = useState<IFormModel>({ open: false });
  const [tab, setTab] = useState<string>(statusSummary.ALL);
  const [summary, setSummary] = useState<IItemSummary[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const queryClient = useQueryClient();
  const handleSearch = (value: any) => {
    setKeyword(value.keyword);
  };

  const renderTitleTab = (title: string, statusSummary: string) => {
    let count = 0;
    if (summary && summary.length > 0) {
      const summaryItem = summary.find(
        (item: IItemSummary) => item.status == statusSummary,
      );

      if (summaryItem && summaryItem?.total_count > 0) {
        count = summaryItem.total_count;
      }
    }

    return (
      <div className="flex items-center">
        <p className="uppercase text-xxs">{title}</p>
        <div className="w-4 h-4 rounded-full bg-green-200 text-blue-500 text-[10px] flex items-center justify-center ml-2">
          <span className="uppercase leading-5 font-normal">{count}</span>
        </div>
      </div>
    );
  };

  const tabs = [
    {
      key: statusSummary.ALL,
      label: renderTitleTab('Tất cả', statusSummary.ALL),
    },
    {
      key: statusSummary.ACTIVE,
      label: renderTitleTab('Đang hoạt động', statusSummary.ACTIVE),
    },
    {
      key: statusSummary.WAITING_WORK,
      label: renderTitleTab('Chờ việc', statusSummary.WAITING_WORK),
    },
  ];

  const handleChangeTabs = (key: string): void => setTab(key);

  return (
    <>
      <HeaderViewList
        title="DANH SÁCH THIẾT BỊ"
        onClickButtonAdd={() => setFormModel({ open: true })}
        buttonCreatingKey={BUTTON_KEY.MANAGE_PAGE_LIST_CREATE}
      >
        <EquipmentPageHeader onSearch={handleSearch} />
      </HeaderViewList>
      <div className="bg-white shadow-xsm rounded-2xl">
        <Tabs
          activeKey={tab}
          className="mb-0"
          items={tabs}
          onChange={handleChangeTabs}
        />
        <TableEquipment
          keyword={keyword}
          status={tab == statusSummary.ALL ? '' : tab}
          setSummary={(value: any) => setSummary(value)}
        ></TableEquipment>
      </div>
      {formModel.open && (
        <EquipmentForm
          onRefetch={() =>
            queryClient.invalidateQueries(['get-table-equipment-list'])
          }
          id={null}
          open={formModel.open}
          onClose={() => setFormModel({ open: false })}
        />
      )}
    </>
  );
};

export default EquipmentList;
