import Header from '_common/component/Layout/Header';
import MenuComponent from '_common/component/Layout/Menu';
import { Outlet } from 'react-router-dom';
import InlineMenu from '../Menu/InlineMenu';
import { useStores } from '_common/hooks';
import { observer } from 'mobx-react-lite';
import DrawerCustom from '_common/component/DrawerCustom';
import ModalConfirm from '_common/component/ModalConfirm2';
import ColumnSetting from '_common/component/ColumnSetting';

function BasicLayout() {
  const {
    drawerStore: { open, object_id, object_type, setDrawer },
    columnSettingStore,
  } = useStores();

  return (
    <>
      <Header />
      <MenuComponent />
      <div id="body-content">
        <div className="pt-[80px] flex min-h-screen">
          <InlineMenu containerClassName="w-[12%] md:flex hidden" />
          <div className="md:p-6 w-[88%] bg-default flex-1 py-6 px-2.5">
            <Outlet />
          </div>
        </div>
      </div>
      <DrawerCustom
        open={open}
        object_id={object_id}
        object_type={object_type}
        onClose={() => {
          setDrawer({
            object_id,
            object_type,
            open: false,
          });
        }}
      />
      <ColumnSetting
        modalProps={columnSettingStore.modalProps}
        open={columnSettingStore.open}
        object_type={columnSettingStore.object_type}
        onClose={() => {
          columnSettingStore.setColumnSetting({
            object_type: null,
            open: false,
          });
        }}
      />
      <ModalConfirm />
    </>
  );
}

export default observer(BasicLayout);
