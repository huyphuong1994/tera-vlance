import HeaderViewList from '../../../_common/component/HeaderViewList';
import { BUTTON_KEY } from '../../../_common/constants/permission';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import MaterialPageHeader from './container/Header';
import MaterialForm from './container/Form';
import TableMaterial from './container/Table';

function MaterialList() {
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
        <MaterialPageHeader onSearch={handleSearch} />
      </HeaderViewList>
      <div className="bg-white shadow-xsm rounded-2xl">
        <TableMaterial keyword={keyword} />
      </div>
      {formModel && (
        <MaterialForm
          onRefetch={() =>
            queryClient.invalidateQueries(['get-table-category-list'])
          }
          id={null}
          open={formModel}
          onClose={() => setFormModel(false)}
        ></MaterialForm>
      )}
    </>
  );
}

export default MaterialList;
