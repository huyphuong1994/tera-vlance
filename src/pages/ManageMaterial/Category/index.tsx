import HeaderViewList from '../../../_common/component/HeaderViewList';
import { BUTTON_KEY } from '../../../_common/constants/permission';
import { useState } from 'react';
import TableCategory from './container/Table';
import CategoryPageHeader from './container/Header';
import CategoryForm from './container/Form';
import { useQueryClient } from '@tanstack/react-query';

function MaterialCategory() {
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
        <CategoryPageHeader onSearch={handleSearch} />
      </HeaderViewList>
      <div className="bg-white shadow-xsm rounded-2xl">
        <TableCategory keyword={keyword} />
      </div>
      {formModel && (
        <CategoryForm
          onRefetch={() =>
            queryClient.invalidateQueries(['get-table-category-list'])
          }
          id={null}
          open={formModel}
          onClose={() => setFormModel(false)}
        ></CategoryForm>
      )}
    </>
  );
}

export default MaterialCategory;
