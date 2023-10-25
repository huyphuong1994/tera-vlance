import HeaderViewList from '../../../_common/component/HeaderViewList';
import { BUTTON_KEY } from '../../../_common/constants/permission';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import TableFix from './container/Table';
import FixForm from './container/Form';
import FixPageHeader from './container/Header';

function EquipmentFix() {
  const queryClient = useQueryClient();
  const [formModel, setFormModel] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = (value: any) => {
    setKeyword(value.keyword);
  };

  return (
    <>
      <HeaderViewList
        title="NHÓM THIẾT BỊ"
        onClickButtonAdd={() => setFormModel(true)}
        buttonCreatingKey={BUTTON_KEY.MANAGE_PAGE_LIST_CREATE}
      >
        <FixPageHeader onSearch={handleSearch} />
      </HeaderViewList>
      <div className="bg-white shadow-xsm rounded-2xl">
        <TableFix keyword={keyword} />
      </div>
      {formModel && (
        <FixForm
          onRefetch={() =>
            queryClient.invalidateQueries(['get-table-category-list'])
          }
          id={null}
          open={formModel}
          onClose={() => setFormModel(false)}
        ></FixForm>
      )}
    </>
  );
}

export default EquipmentFix;
