import HeaderViewList from '../../../_common/component/HeaderViewList';
import { BUTTON_KEY } from '../../../_common/constants/permission';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ManeuverPageHeader from './container/Header';
import TableManeuver from './container/Table';
import FormManeuver from '../Common/Container/FormManeuver';

function EquipmentManeuver() {
  const queryClient = useQueryClient();
  const [formModel, setFormModel] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = (value: any) => {
    setKeyword(value.keyword);
  };

  return (
    <>
      <HeaderViewList
        title="ĐIỀU ĐỘNG"
        onClickButtonAdd={() => setFormModel(true)}
        buttonCreatingKey={BUTTON_KEY.MANAGE_PAGE_LIST_CREATE}
      >
        <ManeuverPageHeader onSearch={handleSearch} />
      </HeaderViewList>
      <div className="bg-white shadow-xsm rounded-2xl">
        <TableManeuver keyword={keyword} />
      </div>
      {formModel && (
        <FormManeuver
          onRefetch={() =>
            queryClient.invalidateQueries(['get-table-category-list'])
          }
          id={null}
          open={formModel}
          onClose={() => setFormModel(false)}
        ></FormManeuver>
      )}
    </>
  );
}

export default EquipmentManeuver;
